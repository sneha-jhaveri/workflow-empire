import { FastifyInstance } from "fastify";
import { db } from "../db/client";

export default async function workflowsRoutes(app: FastifyInstance) {
  // List all workflows
  app.get("/", async () => {
    const result = await db.query("SELECT * FROM workflows");
    return result.rows;
  });

  // Create workflow
  app.post("/", async (request) => {
    const { name, definition } = request.body as {
      name: string;
      definition: any;
    };
    const result = await db.query(
      "INSERT INTO workflows (name, definition) VALUES ($1, $2) RETURNING *",
      [name, definition]
    );
    return result.rows[0];
  });

  // Update workflow
  app.put("/:id", async (request) => {
    const { id } = request.params as { id: string };
    const { name, definition } = request.body as {
      name: string;
      definition: any;
    };
    const result = await db.query(
      "UPDATE workflows SET name=$1, definition=$2 WHERE id=$3 RETURNING *",
      [name, definition, id]
    );
    return result.rows[0];
  });

  // Delete workflow
  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    await db.query("DELETE FROM workflows WHERE id=$1", [id]);
    reply.status(204).send();
  });
}
