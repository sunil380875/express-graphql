import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from 'http';
import { expressMiddleware } from "@as-integrations/express5";
import { resolver } from "./graphql/resolver.js";
import { typeDef } from "./graphql/typeDef.js"
import connectDB from "./db/testconnection.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    typeDefs: typeDef,
    resolvers: resolver,
    introspection: true,
    includeStacktraceInErrorResponses: true,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
});

await connectDB();
await server.start();

app.use(express.json());


app.use("/graphql", expressMiddleware(server, {
    context: async ({ req }) => {
        const user = {
            id: "1",
            name: "Sunil",
            email: "sunil@yopmail.com",
            role: "admin",
        };
        return {
            user
        }
    }
}));

await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve),
);

console.log(`🚀 Server ready at http://localhost:4000/graphql`);