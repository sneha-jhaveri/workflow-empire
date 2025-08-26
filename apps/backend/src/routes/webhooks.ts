import { FastifyInstance } from "fastify";
import crypto from "crypto";
import { useIdempotency } from "../services/idempotency";

const SECRET = process.env.WEBHOOK_SECRET || "defaultsecret";

export default async function webhookRoutes(app: FastifyInstance) {
  app.post("/:provider", async (request, reply) => {
    const { provider } = request.params as { provider: string };
    const signature = request.headers["x-signature"] as string;
    const body = JSON.stringify(request.body);

    // Verify signature
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(body);
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) {
      return reply.status(401).send({ error: "Invalid signature" });
    }

    // Idempotency check
    const eventId = request.headers["x-event-id"] as string;
    const workspaceId = request.headers["x-workspace-id"] as string;

    if (!eventId || !workspaceId) {
      return reply.status(400).send({ error: "Missing headers" });
    }

    const isNew = await useIdempotency(workspaceId, `${provider}:${eventId}`);
    if (!isNew) {
      return reply.status(200).send({ message: "Event already processed" });
    }

    // Process webhook (enqueue job, etc.)
    // TODO: Add job enqueue logic here

    return reply.status(202).send({ message: "Webhook accepted" });
  });
}
