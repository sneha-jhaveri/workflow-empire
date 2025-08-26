import crypto from "crypto";
import { FastifyRequest } from "fastify";
import { db } from "../db/client";

/**
 * Ensures idempotency for webhook requests.
 * @param workspaceId - The workspace ID associated with the request.
 * @param key - The unique idempotency key for the request.
 * @returns True if the key is new, otherwise false.
 */
export async function ensureIdempotency(
  workspaceId: string,
  key: string
): Promise<boolean> {
  try {
    console.log("Attempting to insert idempotency key:", { workspaceId, key });
    await db.query(
      `INSERT INTO idempotency_keys (workspace_id, key, created_at) VALUES ($1, $2, NOW())`,
      [workspaceId, key]
    );
    console.log("Idempotency key inserted successfully:", { workspaceId, key });
    return true;
  } catch (error: any) {
    console.error("Error during idempotency check:", error);
    if (error.code === "23505") {
      // Unique constraint violation
      return false;
    }
    throw error;
  }
}

/**
 * Generates an idempotency key based on the request payload.
 * @param req - The Fastify request object.
 * @returns A unique idempotency key.
 */
export async function generateIdempotencyKey(
  req: FastifyRequest
): Promise<string> {
  const payload = await req.body;
  if (typeof payload !== "string") {
    throw new Error("Invalid payload format");
  }

  return crypto.createHash("sha256").update(payload).digest("hex");
}
