import { FastifyInstance } from "fastify";
import auth from "./auth";
import workflows from "./workflows";
import runs from "./runs";
import webhooks from "./webhooks";
import templates from "./templates";
import secrets from "./secrets";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(auth, { prefix: "/auth" });
  await app.register(workflows, { prefix: "/workflows" });
  await app.register(runs, { prefix: "/runs" });
  await app.register(webhooks, { prefix: "/webhook" });
  await app.register(templates, { prefix: "/templates" });
  await app.register(secrets, { prefix: "/secrets" });
}
