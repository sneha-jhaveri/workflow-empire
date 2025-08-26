import crypto from "crypto";
import { FastifyRequest } from "fastify";

/**
 * Verifies the HMAC signature of a webhook request.
 * @param secret - The shared secret used to generate the HMAC.
 * @param payload - The raw request body.
 * @param signature - The HMAC signature to verify.
 * @returns True if the signature is valid, otherwise false.
 */
export function verifyHmacSignature(
  secret: string,
  payload: string,
  signature: string
): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload, "utf8");
  const expectedSignature = `sha256=${hmac.digest("hex")}`;
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(signature)
  );
}

/**
 * Extracts and verifies the HMAC signature from a Fastify request.
 * @param req - The Fastify request object.
 * @param secret - The shared secret used to generate the HMAC.
 * @param headerName - The name of the header containing the signature.
 * @returns True if the signature is valid, otherwise false.
 */
export async function verifyRequestSignature(
  req: FastifyRequest,
  secret: string,
  headerName = "x-hub-signature-256"
): Promise<boolean> {
  const signature = req.headers[headerName] as string;
  if (!signature) {
    throw new Error("Missing signature header");
  }

  const payload = await req.body;
  if (typeof payload !== "string") {
    throw new Error("Invalid payload format");
  }

  return verifyHmacSignature(secret, payload, signature);
}
