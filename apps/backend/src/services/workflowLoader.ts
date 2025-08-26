import { db } from "../db/client";
import { createGraph, Graph } from "@core/workflow";

export async function loadGraph(
  workflowId: string,
  version: number
): Promise<Graph> {
  const result = await db.query(
    "SELECT graph_json FROM workflow_versions WHERE workflow_id = $1 AND version = $2",
    [workflowId, version]
  );

  if (result.rows.length === 0) {
    throw new Error(
      `Workflow version not found for workflowId=${workflowId}, version=${version}`
    );
  }

  const graphData = result.rows[0].graph_json;
  return createGraph(graphData);
}
