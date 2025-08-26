import { z } from "zod";

// Core workflow definition
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  tokens?: Record<string, string>; // Optional tokens for authentication
  schema?: { nodes: any[]; edges: any[] }; // Optional schema for validation
}

export interface WorkflowNode {
  id: string;
  type: string; // e.g. "slack.sendMessage"
  inputs: Record<string, any>;
  outputs?: Record<string, any>;
  position?: { x: number; y: number };
  label: string;
}

export interface WorkflowEdge {
  id: string;
  source: string; // node id
  target: string; // node id
}

// Zod schemas for validation
export const WorkflowNodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  inputs: z.record(z.any()),
  outputs: z.record(z.any()).optional(),
  position: z.object({ x: z.number(), y: z.number() }).optional(),
  label: z.string(),
});

export const WorkflowEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
});

export const WorkflowSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  nodes: z.array(WorkflowNodeSchema),
  edges: z.array(WorkflowEdgeSchema),
  tokens: z.record(z.string()).optional(),
  schema: z
    .object({ nodes: z.array(z.any()), edges: z.array(z.any()) })
    .optional(),
});

// Utility functions for graph traversal
export const edgesFrom = (workflow: Workflow, nodeId: string) => {
  return workflow.edges.filter((edge) => edge.source === nodeId);
};

export const fallbackFrom = (workflow: Workflow, nodeId: string) => {
  return workflow.edges.find(
    (edge) => edge.source === nodeId && edge.target === "fallback"
  );
};
