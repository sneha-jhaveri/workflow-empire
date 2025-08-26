import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "../store/workflow";

export const WorkflowBuilder: React.FC = () => {
  const workflow = useWorkflowStore((s) => s.currentWorkflow);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a template to start building your workflow
      </div>
    );
  }

  const nodes: Node[] = workflow.nodes.map((node) => ({
    id: node.id,
    data: { label: node.label },
    position: node.position || { x: 0, y: 0 },
    type: "default",
  }));

  const edges: Edge[] = workflow.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));

  const handleNodeClick = (event: any, node: Node) => {
    setSelectedNode(node);
  };

  const handleInputChange = (key: string, value: any) => {
    if (selectedNode) {
      selectedNode.data = { ...selectedNode.data, [key]: value };
      setSelectedNode({ ...selectedNode });
    }
  };

  return (
    <div style={{ height: "100vh" }} className="relative">
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick}>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      {selectedNode && (
        <div className="absolute top-0 right-0 p-4 bg-white shadow-md">
          <h3 className="font-bold text-lg mb-4">Edit Node</h3>
          {Object.keys(selectedNode.data).map((key) => (
            <div key={key} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {key}
              </label>
              <input
                type="text"
                value={selectedNode.data[key]}
                onChange={(e) => handleInputChange(key, e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
