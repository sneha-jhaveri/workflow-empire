import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "../store/workflow";

export const WorkflowBuilder: React.FC = () => {
  const workflow = useWorkflowStore((s) => s.currentWorkflow);

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a template to start building your workflow
      </div>
    );
  }

  const elements = [
    ...workflow.nodes.map((node: { id: any; label: any; position: any }) => ({
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

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={elements.filter((el) => "data" in el)}
        edges={elements.filter((el) => "source" in el)}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
