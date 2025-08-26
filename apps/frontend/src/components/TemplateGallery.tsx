import React from "react";
import { sampleTemplates } from "@core/template";
import { useWorkflowStore } from "../store/workflow";

export const TemplateGallery: React.FC = () => {
  const setWorkflow = useWorkflowStore((s) => s.setWorkflow);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {sampleTemplates.map((template) => (
        <div
          key={template.id}
          className="p-4 rounded-2xl shadow bg-white hover:shadow-lg transition cursor-pointer"
          onClick={() =>
            setWorkflow({
              ...template,
              tokens: { apiKey: "your-api-key", secret: "your-secret" },
              schema: { nodes: [], edges: [] },
            })
          }
        >
          <h3 className="font-bold text-lg">{template.name}</h3>
          <p className="text-gray-600">{template.description}</p>
        </div>
      ))}
    </div>
  );
};
