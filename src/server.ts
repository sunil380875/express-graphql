import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from "express";
import http from 'http';
import { expressMiddleware } from "@as-integrations/express5";
import { resolver } from "./graphql/resolver.js";
import { typeDef } from "./graphql/typeDef.js"
import connectDB from "./db/testconnection.js";

const app = express();
const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs: typeDef, resolvers: resolver });

// Creating the WebSocket server
const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if app.use
    // serves expressMiddleware at a different path
    path: '/graphql',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    schema,
    introspection: true,
    includeStacktraceInErrorResponses: true,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
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
setInterval(() => {
    const memory = process.memoryUsage();

    console.log({
        rss: (memory.rss / 1024 / 1024).toFixed(2) + " MB",
        heapTotal: (memory.heapTotal / 1024 / 1024).toFixed(2) + " MB",
        heapUsed: (memory.heapUsed / 1024 / 1024).toFixed(2) + " MB",
        external: (memory.external / 1024 / 1024).toFixed(2) + " MB",
    });
}, 5000);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);