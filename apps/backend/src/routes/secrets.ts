import { FastifyInstance } from "fastify";

export default async function secretsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { message: "Secrets route placeholder" };
  });
}
