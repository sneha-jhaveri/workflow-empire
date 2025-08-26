import { FastifyInstance } from "fastify";

export default async function runsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return { message: "Runs route placeholder" };
  });
}
