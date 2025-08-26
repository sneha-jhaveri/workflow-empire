import { create } from "zustand";
import { Workflow } from "@core/workflow";

interface WorkflowState {
  currentWorkflow: Workflow | null;
  setWorkflow: (wf: Workflow) => void;
  runWorkflow: (workflowDefinition: any) => Promise<void>;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  currentWorkflow: null,
  setWorkflow: (wf) => set({ currentWorkflow: wf }),
  runWorkflow: async (workflowDefinition: any) => {
    await fetch("http://localhost:4000/api/workflow-run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ definition: workflowDefinition }),
    });
  },
}));
