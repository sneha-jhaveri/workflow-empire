import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "../store/workflow";

export const WorkflowBuilder: React.FC = () => {
  const workflow = useWorkflowStore((s) => s.currentWorkflow);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a template to start building your workflow
      </div>
    );
  }

  const elements = [
    ...workflow.nodes.map((node) => ({
      id: node.id,
      data: { label: node.label },
      position: node.position || { x: 0, y: 0 },
      type: "default",
    })),
    ...workflow.edges.map((edge: { id: any; source: any; target: any }) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    })),
  ];

  const handleNodeClick = (event: any, node: any) => {
    setSelectedNode(node);
  };

  const handleInputChange = (key: string, value: any) => {
    if (selectedNode) {
      selectedNode.data[key] = value;
      setSelectedNode({ ...selectedNode });
    }
  };

  return (
    <div className="h-full w-full flex">
      <div className="flex-1">
        <ReactFlow
          nodes={elements.filter((el) => "data" in el)}
          edges={elements.filter((el) => "source" in el)}
          onNodeClick={handleNodeClick}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      {selectedNode && (
        <div className="w-1/3 p-4 bg-gray-100">
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
