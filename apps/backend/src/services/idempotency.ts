import { db } from "../db/client";

export async function useIdempotency(
  workspaceId: string,
  key: string
): Promise<boolean> {
  try {
    await db.query(
      `INSERT INTO idempotency_keys (workspace_id, key) VALUES ($1, $2)`,
      [workspaceId, key]
    );
    return true;
  } catch (err) {
    return false;
  }
}
