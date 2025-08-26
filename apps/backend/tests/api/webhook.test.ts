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

  it("should return 401 for invalid signature", async () => {
    const app = await createServer();
    const response = await supertest(app.server)
      .post("/webhook/test")
      .set("x-signature", "invalid")
      .send({ key: "value" });
    expect(response.status).toBe(401);
  });

  it("should return 400 for missing headers", async () => {
    const app = await createServer();
    const response = await supertest(app.server)
      .post("/webhook/test")
      .send({ key: "value" });
    expect(response.status).toBe(400);
  });

  it("should return 200 for duplicate requests", async () => {
    const app = await createServer();
    await supertest(app.server).post("/webhook/test").send({ key: "value" });
    const response = await supertest(app.server)
      .post("/webhook/test")
      .send({ key: "value" });
    expect(response.status).toBe(200);
  });
});
