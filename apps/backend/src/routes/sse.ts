import { FastifyInstance } from "fastify";
import { subscribeToRunUpdates } from "../services/events";

interface RunUpdateEvent {
  step: string;
  status: string;
  timestamp: string;
}

export async function sseRoutes(app: FastifyInstance) {
  app.get("/sse/runs/:id", async (req, reply) => {
    const { id } = req.params as { id: string };

    reply.raw.setHeader("Content-Type", "text/event-stream");
    reply.raw.setHeader("Cache-Control", "no-cache");
    reply.raw.setHeader("Connection", "keep-alive");

    const unsubscribe = subscribeToRunUpdates(id, (event: RunUpdateEvent) => {
      reply.raw.write(`data: ${JSON.stringify(event)}\n\n`);
    });

    req.raw.on("close", () => {
      unsubscribe();
      reply.raw.end();
    });
  });
}
