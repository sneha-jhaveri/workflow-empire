import Fastify, { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes";
import { logger } from "./services/logger";
import { sseRoutes } from "./routes/sse";
import { metricsPlugin } from "./services/metrics";

export async function createServer() {
  try {
    const app: FastifyInstance = Fastify({ logger });
    // Enable CORS
    await app.register(cors, { origin: true });
    // Register routes
    await registerRoutes(app);
    await app.register(sseRoutes);
    await app.register(metricsPlugin);
    // Health check endpoint
    app.get("/health", async () => ({ ok: true }));

    // Add detailed logging for debugging
    app.addHook("onRequest", async (request, reply) => {
      console.log("Incoming request:", {
        method: request.method,
        url: request.url,
        headers: request.headers,
      });
    });

    app.addHook("onResponse", async (request, reply) => {
      console.log("Response sent:", {
        statusCode: reply.statusCode,
        url: request.url,
      });
    });

    return app;
  } catch (error) {
    console.error("Error during server setup:", error);
    throw error;
  }
}
