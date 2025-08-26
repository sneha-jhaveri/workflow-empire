import { FastifyInstance } from "fastify";
import {
  generateGraph,
  modifyGraph,
  explainNode,
} from "../services/ai-service";

export default async function aiRoutes(app: FastifyInstance) {
  app.post("/ai/generate-graph", async (request, reply) => {
    const { prompt, targetApps } = request.body as {
      prompt: string;
      targetApps?: string[];
    };
    try {
      const graph = await generateGraph(prompt, targetApps);
      reply.send(graph);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  });

  app.post("/ai/modify-graph", async (request, reply) => {
    const { graph, instruction } = request.body as {
      graph: object;
      instruction: string;
    };
    try {
      const modifiedGraph = await modifyGraph(graph, instruction);
      reply.send(modifiedGraph);
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  });

  app.post("/ai/explain-node", async (request, reply) => {
    const { nodeId } = request.body as { nodeId: string };
    try {
      const explanation = await explainNode(nodeId);
      reply.send({ explanation });
    } catch (error: any) {
      reply.status(500).send({ error: error.message });
    }
  });
}
