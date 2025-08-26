export type NodeImpl = {
  type: string; // e.g., "http.request", "email.send"
  meta: {
    label: string;
    inputs: Record<string, string>;
    outputs: Record<string, string>;
  };
  run(args: { ctx: any; node: any; input: any }): Promise<any>;
  verify?(secrets: any): Promise<void>;
};

export type Registry = Record<string, NodeImpl>;

const registry: Registry = {};

export function registerNode(node: NodeImpl) {
  registry[node.type] = node;
}

export function getNode(type: string): NodeImpl {
  const node = registry[type];
  if (!node) {
    throw new Error(`Node type '${type}' not found in registry.`);
  }
  return node;
}
