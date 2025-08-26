import { db } from "../db/client";
import { Workflow } from "../../../../packages/core/src/workflow";

export async function loadGraph(
  workflowId: string,
  version: number
): Promise<Workflow> {
  const result = await db.query(
    "SELECT graph_json FROM workflow_versions WHERE workflow_id = $1 AND version = $2",
    [workflowId, version]
  );

  if (result.rows.length === 0) {
    throw new Error("Workflow version not found");
  }

  return JSON.parse(result.rows[0].graph_json);
}
