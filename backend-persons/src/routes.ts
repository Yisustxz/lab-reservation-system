import { Request, Response, Router } from "express";
import { createUserSchema, updateUserSchema } from "./types";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByCedula,
  findUserByEmail,
  findUserById,
  updateUser,
} from "./userModel";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await findAllUsers();
    const usersResponse = users.map(user => ({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      cedula: user.cedula,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));

    res.json({
      success: true,
      data: usersResponse,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const user = await findUserById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const userResponse = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      cedula: user.cedula,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.json({
      success: true,
      data: userResponse,
      message: "User retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details[0].message,
      });
      return;
    }

    const existingUserByEmail = await findUserByEmail(value.email);
    if (existingUserByEmail) {
      res.status(409).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }

    const existingUserByCedula = await findUserByCedula(value.cedula);
    if (existingUserByCedula) {
      res.status(409).json({
        success: false,
        message: "Cedula already exists",
      });
      return;
    }

    const user = await createUser(value);

    const userResponse = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      cedula: user.cedula,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.status(201).json({
      success: true,
      data: userResponse,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const { error, value } = updateUserSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.details[0].message,
      });
      return;
    }

    if (value.email) {
      const existingUser = await findUserByEmail(value.email);
      if (existingUser && existingUser.id !== id) {
        res.status(409).json({
          success: false,
          message: "Email already exists",
        });
        return;
      }
    }

    if (value.cedula) {
      const existingUser = await findUserByCedula(value.cedula);
      if (existingUser && existingUser.id !== id) {
        res.status(409).json({
          success: false,
          message: "Cedula already exists",
        });
        return;
      }
    }

    const user = await updateUser(id, value);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    const userResponse = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      cedula: user.cedula,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.json({
      success: true,
      data: userResponse,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
      return;
    }

    const deleted = await deleteUser(id);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
