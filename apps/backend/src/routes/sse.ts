import { FastifyInstance } from "fastify";

export async function sseRoutes(app: FastifyInstance) {
  app.get("/sse/runs/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");

    // Simulate sending live updates
    const interval = setInterval(() => {
      const event = JSON.stringify({
        step: "example-step",
        status: "in-progress",
        timestamp: new Date().toISOString(),
      });
      reply.raw.write(`data: ${event}\n\n`);
    }, 1000);

    req.raw.on("close", () => {
      clearInterval(interval);
      reply.raw.end();
    });
  });
}
