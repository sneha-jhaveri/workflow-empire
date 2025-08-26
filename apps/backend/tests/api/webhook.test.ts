// @ts-ignore
import { describe, it, expect } from "vitest";
import supertest from "supertest";
import { createServer } from "../../src/server";

describe("Webhook API", () => {
  it("should return 200 for valid webhook", async () => {
    const app = await createServer();
    const response = await supertest(app.server)
      .post("/webhook/test")
      .send({ key: "value" });
    expect(response.status).toBe(200);
  }, 10000); // Increased timeout to 10 seconds
});
