import { z } from "zod";

const GraphSpec = z.object({
  nodes: z.array(z.object({ id: z.string(), type: z.string() })),
  edges: z.array(z.object({ from: z.string(), to: z.string() })),
});

export async function generateGraph(prompt: string, targetApps?: string[]) {
  // Simulate AI graph generation
  return GraphSpec.parse({
    nodes: [{ id: "1", type: "start" }],
    edges: [],
  });
}

export async function modifyGraph(graph: object, instruction: string) {
  // Simulate graph modification
  return GraphSpec.parse(graph);
}

export async function explainNode(nodeId: string) {
  // Simulate node explanation
  return `Node ${nodeId} is a start node.`;
}
