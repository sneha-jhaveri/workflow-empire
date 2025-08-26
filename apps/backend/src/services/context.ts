import { db } from "../db/client";

export async function createCtx({
  workspaceId,
  payload,
}: {
  workspaceId: string;
  payload: any;
}) {
  return {
    initial: payload,
    connectors: {
      load: async (type: string) => {
        // Replace mock implementation with actual connector loading logic
        try {
          const connector = await import(`../connectors/${type}`);
          return connector;
        } catch (error) {
          console.error(`Failed to load connector for type: ${type}`, error);
          throw new Error(`Connector not found for type: ${type}`);
        }
      },
    },
    persistStep: async (step: {
      nodeId: string;
      status: string;
      ms: number;
      output?: any;
      error?: any;
    }) => {
      // Add error handling for database persistence
      try {
        console.log("Persisting step: ", step);
        await db.query(
          "INSERT INTO run_steps (run_id, node_id, status, started_at, finished_at, output_json, logs, retry_count) VALUES ($1, $2, $3, now(), now(), $4, $5, $6)",
          [
            step.nodeId,
            step.status,
            step.ms,
            step.output ? JSON.stringify(step.output) : null,
            step.error ? JSON.stringify(step.error) : null,
            0, // retry_count
          ]
        );
      } catch (error) {
        console.error("Error persisting step:", error);
        throw new Error("Failed to persist step data");
      }
    },
  };
}
