// Core workflow definition
export interface Workflow {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface WorkflowNode {
  id: string;
  type: string; // e.g. "slack.sendMessage"
  inputs: Record<string, any>;
  outputs?: Record<string, any>;
}

export interface WorkflowEdge {
  id: string;
  source: string; // node id
  target: string; // node id
}
