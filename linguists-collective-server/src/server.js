import { GraphQLServer } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import Job from './resolvers/Job'
import User from './resolvers/User'
const { prisma } = require('../prisma-api/generated/prisma-client')

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Job,
        User
    },
    context(request) {
        return {
            prisma,
            request
        }
    }
})

export { server as default }