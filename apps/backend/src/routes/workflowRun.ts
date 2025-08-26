import { Router } from "express";
import { executeWorkflow } from "../services/workflowExecutor";

const router = Router();

router.post("/workflow-run", async (req, res) => {
  const { definition } = req.body;
  try {
    await executeWorkflow(definition);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Workflow execution failed");
  }
});

export default router;
