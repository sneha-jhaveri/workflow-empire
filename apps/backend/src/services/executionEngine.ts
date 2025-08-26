import { Graph, Node, Edge, ExecutionContext } from "@core/workflow";
import { logger } from "./logger";

export async function executeGraph(ctx: ExecutionContext, graph: Graph) {
  const visited = new Set<string>();

  async function runNode(id: string, input: any) {
    if (visited.has(id)) return;
    visited.add(id);

    const node = graph.nodes[id];
    const impl = await ctx.connectors.load(node.type);
    const start = Date.now();

    try {
      const output = await impl.run({ ctx, node, input });
      await ctx.persistStep({
        nodeId: id,
        status: "ok",
        ms: Date.now() - start,
        output,
      });

      for (const e of graph.out.edgesFrom(id)) {
        if (!e.condition || (await e.condition({ ctx, input: output }))) {
          await runNode(e.to, output);
        }
      }
    } catch (err: any) {
      await ctx.persistStep({
        nodeId: id,
        status: "error",
        ms: Date.now() - start,
        error: err,
      });

      const fallback = graph.out.fallbackFrom(id);
      if (fallback) {
        return runNode(fallback.to, { error: err });
      }

      throw err;
    }
  }

  await runNode(graph.start, ctx.initial);
}
