import React from "react";
import { sampleTemplates } from "../../../packages/core/src/templates";
import { useWorkflowStore } from "../store/workflow";

export const TemplateGallery: React.FC = () => {
  const setWorkflow = useWorkflowStore((s) => s.setWorkflow);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {sampleTemplates.map(
        (template: {
          id: React.Key | null | undefined;
          name:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined;
          description:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode>
            | React.ReactPortal
            | null
            | undefined;
        }) => (
          <div
            key={template.id}
            className="p-4 rounded-2xl shadow bg-white hover:shadow-lg transition cursor-pointer"
            onClick={() => setWorkflow(template)}
          >
            <h3 className="font-bold text-lg">{template.name}</h3>
            <p className="text-gray-600">{template.description}</p>
          </div>
        )
      )}
    </div>
  );
};
