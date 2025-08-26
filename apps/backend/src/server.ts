// // Server setup using Fastify or Express
// import Fastify, { FastifyRequest, FastifyReply } from "fastify";

// const server = Fastify();

// server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
//   reply.send({ message: "Hello, Workflow Empire!" });
// });

// export const startServer = async () => {
//   try {
//     await server.listen({ port: 3000 });
//     console.log("Server is running on http://localhost:3000");
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

import Fastify from "fastify";
import cors from "@fastify/cors";

export async function startServer() {
  const app = Fastify({ logger: true });

  // Enable CORS
  await app.register(cors, { origin: true });

  // Health check endpoint
  app.get("/health", async () => ({ ok: true }));

  // Start the server
  try {
    const port = process.env.PORT || 3000;
    await app.listen({ port: Number(port), host: "0.0.0.0" });
    console.log(`Server is running on http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}
