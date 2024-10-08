const typeDefs = `
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String
        image: String!
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me(id: ID, username: String): User
    }


    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String, link: String): User
        loginUser(username: String, email: String, password: String!): Auth
        removeBook(bookId: String!): User
    }

`

module.exports = typeDefs

