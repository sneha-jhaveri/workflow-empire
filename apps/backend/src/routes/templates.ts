import { FastifyInstance } from "fastify";
import { db } from "../db/client";

export default async function templateRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const templates = await db.query("SELECT * FROM templates");
    return reply.send(templates.rows);
  });

  app.get("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const template = await db.query("SELECT * FROM templates WHERE id = $1", [
      id,
    ]);

    if (template.rows.length === 0) {
      return reply.status(404).send({ error: "Template not found" });
    }

    return reply.send(template.rows[0]);
  });

  app.post("/:id/install", async (request, reply) => {
    const { id } = request.params as { id: string };
    const template = await db.query("SELECT * FROM templates WHERE id = $1", [
      id,
    ]);

    if (template.rows.length === 0) {
      return reply.status(404).send({ error: "Template not found" });
    }

    // Logic to install the template (e.g., create a new workflow)
    // TODO: Implement installation logic

    return reply.status(201).send({ message: "Template installed" });
  });
}
