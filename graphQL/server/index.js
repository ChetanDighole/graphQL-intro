const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4')
const bodyParser = require('body-parser');
const cors = require('cors');
const { default: axios } = require('axios');

const { TODOS } = require('./todo.js')
const { USERS } = require('./user.js')

async function startServer() {
    const app = express();

    const server = new ApolloServer({
        typeDefs: `

        type User {
            id: ID!
            name: String!
            username: String!
            email: String!
            phone: String!
            website: String!
        }

        type Todo {
            id: ID!
            title: String!
            completed: Boolean!
            user: User
        }

        type Query {
            getTodo: [Todo]
            getAllUsers: [User]
            getUser(id: ID!): User
        }

        `,
        resolvers: {

            Todo: {
                user: (todo) => USERS.find(e => e.id === todo.id)
            },

            Query: {
                getTodo: () => TODOS,
                getAllUsers: () => USERS,
                getUser: (parent, { id }) => USERS.find((e) => e.id === id)
            }
        }
    });

    app.use(cors());
    app.use(bodyParser.json());

    await server.start()

    app.use('/graphql', expressMiddleware(server))

    app.listen(8000, () => console.log("server started"))

}

startServer()
