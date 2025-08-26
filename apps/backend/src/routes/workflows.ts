import { Router } from "express";
import { db } from "../db/client";

const router = Router();

// List all workflows
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM workflows");
  res.json(result.rows);
});

// Create workflow
router.post("/", async (req, res) => {
  const { name, definition } = req.body;
  const result = await db.query(
    "INSERT INTO workflows (name, definition) VALUES ($1, $2) RETURNING *",
    [name, definition]
  );
  res.json(result.rows[0]);
});

// Update workflow
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, definition } = req.body;
  const result = await db.query(
    "UPDATE workflows SET name=$1, definition=$2 WHERE id=$3 RETURNING *",
    [name, definition, id]
  );
  res.json(result.rows[0]);
});

// Delete workflow
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM workflows WHERE id=$1", [id]);
  res.sendStatus(204);
});

export default router;
