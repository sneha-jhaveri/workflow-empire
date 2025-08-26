import { create } from "zustand";
import type { Workflow } from "../../../packages/core/src/workflow";

interface WorkflowState {
  currentWorkflow: Workflow | null;
  setWorkflow: (wf: Workflow) => void;
}

export const useWorkflowStore = create<WorkflowState>((set) => ({
  currentWorkflow: null,
  setWorkflow: (wf) => set({ currentWorkflow: wf }),
}));
