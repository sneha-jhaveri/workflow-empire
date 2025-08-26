import Fastify, { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import cors from "@fastify/cors";
import { registerRoutes } from "./routes";
import { logger } from "./services/logger";
import { sseRoutes } from "./routes/sse";
import { metricsPlugin } from "./services/metrics";
import { verifyJWT } from "./services/auth";

export async function createServer() {
  try {
    const app: FastifyInstance = Fastify({ logger });
    // Enable CORS with restricted origins in production
    const corsOptions =
      process.env.NODE_ENV === "production"
        ? { origin: ["https://your-production-domain.com"] }
        : { origin: true };

    await app.register(cors, corsOptions);
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

    // Middleware to enforce JWT authentication
    app.addHook("onRequest", async (request, reply) => {
      if (!request.url.startsWith("/public")) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
          reply.code(401).send({ error: "Unauthorized" });
          return;
        }
        const token = authHeader.split(" ")[1];
        try {
          const decoded = verifyJWT(token);
          request.user = decoded;
        } catch (err) {
          reply.code(401).send({ error: "Invalid token" });
          return;
        }
      }
    });

    return app;
  } catch (error) {
    console.error("Error during server setup:", error);
    throw error;
  }
}
