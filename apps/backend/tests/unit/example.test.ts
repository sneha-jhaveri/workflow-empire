import { describe, it, expect, vi } from "vitest";
import { ensureIdempotency } from "../../src/services/idempotency";
import { executeGraph } from "../../src/services/executionEngine";

describe("Idempotency Service", () => {
  it("should return true for a new idempotency key", async () => {
    const mockDb = { query: vi.fn().mockResolvedValueOnce({}) };
    const result = await ensureIdempotency("workspace1", "key1");
    expect(result).toBe(true);
  });

  it("should return false for a duplicate idempotency key", async () => {
    const mockDb = { query: vi.fn().mockRejectedValueOnce({ code: "23505" }) };
    const result = await ensureIdempotency("workspace1", "key1");
    expect(result).toBe(false);
  });
});

describe("Execution Engine", () => {
  it("should execute a simple graph successfully", async () => {
    const mockCtx = {
      initial: {},
      connectors: {
        load: vi.fn().mockResolvedValue({ run: vi.fn().mockResolvedValue({}) }),
      },
      persistStep: vi.fn(),
    };
    const mockGraph = {
      nodes: {
        start: {
          id: "start",
          type: "test",
          inputs: {},
          label: "Start Node",
        },
      },
      edges: [],
      start: "start",
      out: {
        edgesFrom: vi.fn().mockReturnValue([]),
        fallbackFrom: vi.fn().mockReturnValue(null),
      },
    };
    await executeGraph(mockCtx, mockGraph);
    expect(mockCtx.persistStep).toHaveBeenCalled();
  });
});
