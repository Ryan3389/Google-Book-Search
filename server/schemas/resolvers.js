const { signToken, AuthenticationError } = require('../utils/auth')
const { User } = require('../models')
const { Query } = require('mongoose')
const { createUser } = require('../controllers/user-controllers')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (!context.user) {
                throw AuthenticationError
            }

            const foundUser = await User.findOne({
                $or: [{ _id: context.user ? context.user._id : args.id }, { username: args.username }],
            });

            if (!foundUser) {
                return { message: 'Unable to find user' }
            }

            return foundUser
        }
    },

    mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);

            if (!user) {
                return { message: 'Something went wrong' }
            }

            const token = signToken(user)

            return { token, user }
        },

        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email: email })

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user)

            return { token, user }
        },

        saveBook: async (parent, args, context) => {
            if (!context.user) {
                throw AuthenticationError
            }

            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true, runValidators: true }
                );

                return updatedUser
            } catch (error) {
                console.error(error)
            }
        },

        deleteBook: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );

            if (!updatedUser) {
                console.log("Couldn't find user with this id!")
            }
            return updatedUser
        }

    }
}

module.exports = resolvers