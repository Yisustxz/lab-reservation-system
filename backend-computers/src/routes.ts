import { Router } from "express";
import pool from "./database";
import { computerModel, labModel } from "./models";
import {
  createComputerSchema,
  createLabSchema,
  updateComputerSchema,
  updateLabSchema,
} from "./types";

const router = Router();

// Labs routes
router.get("/api/labs", async (req, res) => {
  try {
    const labs = await labModel.getAll();
    res.json(labs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching labs" });
  }
});

router.get("/api/labs/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const lab = await labModel.getById(id);
    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }
    res.json(lab);
  } catch (error) {
    res.status(500).json({ error: "Error fetching lab" });
  }
});

router.post("/api/labs", async (req, res) => {
  try {
    const { error } = createLabSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const lab = await labModel.create(req.body);
    res.status(201).json(lab);
  } catch (error) {
    res.status(500).json({ error: "Error creating lab" });
  }
});

router.put("/api/labs/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { error } = updateLabSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const lab = await labModel.update(id, req.body);
    if (!lab) {
      return res.status(404).json({ error: "Lab not found" });
    }
    res.json(lab);
  } catch (error) {
    res.status(500).json({ error: "Error updating lab" });
  }
});

router.delete("/api/labs/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid lab ID",
      });
      return;
    }

    const deleted = await labModel.delete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Lab not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Lab deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting lab",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Computers routes
router.get("/api/computers", async (req, res) => {
  try {
    const computers = await computerModel.getAll();
    res.json(computers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching computers" });
  }
});

router.get("/api/computers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const computer = await computerModel.getById(id);
    if (!computer) {
      return res.status(404).json({ error: "Computer not found" });
    }
    res.json(computer);
  } catch (error) {
    res.status(500).json({ error: "Error fetching computer" });
  }
});

router.get("/api/labs/:labId/computers", async (req, res) => {
  try {
    const labId = parseInt(req.params.labId);
    const computers = await computerModel.getByLabId(labId);
    res.json(computers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching computers" });
  }
});

router.post("/api/computers", async (req, res) => {
  try {
    const { error } = createComputerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const computer = await computerModel.create(req.body);
    res.status(201).json(computer);
  } catch (error) {
    res.status(500).json({ error: "Error creating computer" });
  }
});

router.put("/api/computers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { error } = updateComputerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const computer = await computerModel.update(id, req.body);
    if (!computer) {
      return res.status(404).json({ error: "Computer not found" });
    }
    res.json(computer);
  } catch (error) {
    res.status(500).json({ error: "Error updating computer" });
  }
});

router.delete("/api/computers/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid computer ID",
      });
      return;
    }

    const deleted = await computerModel.delete(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Computer not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "Computer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting computer",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check
router.get("/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      service: "backend-computers",
    });
  } catch (error) {
    res.status(500).json({
      status: "BDDERROR",
      service: "backend-computers",
      timestamp: new Date().toISOString(),
      details:
        error instanceof Error ? error.message : "Unknown database error",
    });
  }
});

router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

export default router;
