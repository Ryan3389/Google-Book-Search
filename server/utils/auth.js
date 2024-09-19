// const { GraphQLError } = require('graphql');
// const jwt = require('jsonwebtoken');
// require('dotenv').config()

// const secret = process.env.SECRET
// const expiration = process.env.JWT_EXPIRE

// module.exports = {
//     AuthenticationError: new GraphQLError('Could not authenticate user.', {
//         extensions: {
//             code: 'UNAUTHENTICATED',
//         },
//     }),
//     authMiddleware: function (req) {
//         let token = req.query.token || req.body.token || req.headers.authorization;
//         if (req.headers.authorization) {
//             token = token.split(' ').pop().trim();
//         }

//         if (!token) {
//             return req
//         }
//         try {
//             const { data } = jwt.verify(token, secret, { maxAge: expiration });
//             req.user = data;
//         } catch (error) {
//             console.log('Invalid token');
//         }

//         return req
//     },
//     signToken: function ({ username, email, _id }) {
//         const payload = { username, email, _id };

//         return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//     },
// }

const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const secret = process.env.SECRET
const expiration = process.env.JWT_EXPIRE

module.exports = {
    AuthenticationError: new GraphQLError("Could not authenticate user.", {
        extensions: {
            code: "UNAUTHENTICATED",
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        }

        return req;
    },
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};