import { FastifyInstance } from "fastify";
import client from "prom-client";

// Create a registry to register metrics
const register = new client.Registry();

// Default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
const requestCount = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.1, 0.5, 1, 3, 5],
});

register.registerMetric(requestCount);
register.registerMetric(requestDuration);

export async function metricsPlugin(app: FastifyInstance) {
  app.addHook("onResponse", async (req, reply) => {
    const route = req.routerPath || "unknown";
    const method = req.method;
    const status = reply.statusCode;
    const duration = reply.getResponseTime() / 1000;

    requestCount.inc({ method, route, status });
    requestDuration.observe({ method, route, status }, duration);
  });

  app.get("/metrics", async (req, reply) => {
    reply.header("Content-Type", register.contentType);
    return register.metrics();
  });
}
