// Node plugin adapter interface for 3rd party connectors
export interface NodePlugin {
  type: string; // unique identifier (e.g. "slack.sendMessage")
  label: string; // human readable
  description?: string;
  inputs: NodeInput[];
  outputs: NodeOutput[];
  run: (
    inputs: Record<string, any>,
    context?: any
  ) => Promise<Record<string, any>>;
}

export interface NodeInput {
  name: string;
  type: "string" | "number" | "boolean" | "json";
  required: boolean;
}

export interface NodeOutput {
  name: string;
  type: "string" | "number" | "boolean" | "json";
}
