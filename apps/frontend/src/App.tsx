import React from "react";
import { TemplateGallery } from "./components/TemplateGallery";
import { WorkflowBuilder } from "./components/WorkflowBuilder";

function App() {
  return (
    <div className="h-screen grid grid-cols-3">
      {/* Left: Template Gallery */}
      <div className="col-span-1 border-r overflow-y-auto">
        <h1 className="text-xl font-bold p-4">Workflow Templates</h1>
        <TemplateGallery />
      </div>

      {/* Right: Workflow Builder */}
      <div className="col-span-2">
        <WorkflowBuilder />
      </div>
    </div>
  );
}

export default App;
