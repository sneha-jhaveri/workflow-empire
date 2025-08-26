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

  const addNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      data: { label: `Node ${nodes.length + 1}` },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: "default",
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const addEdge = () => {
    if (nodes.length < 2) {
      alert("Add at least two nodes to create an edge.");
      return;
    }
    const newEdge = {
      id: `edge-${edges.length + 1}`,
      source: nodes[nodes.length - 2].id,
      target: nodes[nodes.length - 1].id,
    };
    setEdges((prevEdges) => [...prevEdges, newEdge]);
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
      <div className="absolute bottom-0 left-0 p-4 bg-white shadow-md">
        <button
          onClick={addNode}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Node
        </button>
        <button
          onClick={addEdge}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Add Edge
        </button>
      </div>
    </div>
  );
};
