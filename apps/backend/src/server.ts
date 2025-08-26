// Server setup using Fastify or Express
import Fastify from "fastify";

const server = Fastify();

server.get("/", async (request, reply) => {
  reply.send({ message: "Hello, Workflow Empire!" });
});

export const startServer = async () => {
  try {
    await server.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
