import { test, Tap } from "tap";
import Fastify from "fastify";
import { sseRoutes } from "../../src/routes/sse";
import { publishRunUpdate } from "../../src/services/events";

const buildTestServer = () => {
  const app = Fastify();
  app.register(sseRoutes);
  return app;
};

test("SSE route streams updates", async (t: Tap.Test) => {
  const app = buildTestServer();

  const runId = "test-run";
  const updates = [
    { step: "1", status: "started", timestamp: new Date().toISOString() },
    { step: "1", status: "completed", timestamp: new Date().toISOString() },
  ];

  const response = await app.inject({
    method: "GET",
    url: `/sse/runs/${runId}`,
  });

  t.equal(response.statusCode, 200, "Response status is 200");
  t.match(
    response.headers["content-type"],
    /text\/event-stream/,
    "Content-Type is text/event-stream"
  );

  // Simulate publishing updates
  updates.forEach((update) => publishRunUpdate(runId, update));

  // Verify streamed updates
  updates.forEach((update) => {
    t.match(
      response.payload,
      JSON.stringify(update),
      `Payload contains update: ${JSON.stringify(update)}`
    );
  });

  await app.close();
});
