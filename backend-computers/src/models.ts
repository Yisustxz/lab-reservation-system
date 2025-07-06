import pool from "./database";
import {
  Computer,
  CreateComputerRequest,
  CreateLabRequest,
  Lab,
  UpdateComputerRequest,
  UpdateLabRequest,
} from "./types";

export const labModel = {
  async getAll(): Promise<Lab[]> {
    const result = await pool.query(
      "SELECT * FROM labs ORDER BY created_at DESC"
    );
    return result.rows;
  },

  async getById(id: number): Promise<Lab | null> {
    const result = await pool.query("SELECT * FROM labs WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  async create(data: CreateLabRequest): Promise<Lab> {
    const result = await pool.query(
      "INSERT INTO labs (nombre) VALUES ($1) RETURNING *",
      [data.nombre]
    );
    return result.rows[0];
  },

  async update(id: number, data: UpdateLabRequest): Promise<Lab | null> {
    const result = await pool.query(
      "UPDATE labs SET nombre = COALESCE($1, nombre), updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [data.nombre, id]
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM labs WHERE id = $1", [id]);

    if (!result.rowCount) {
      return false;
    }

    return true;
  },
};

export const computerModel = {
  async getAll(): Promise<Computer[]> {
    const result = await pool.query(
      "SELECT * FROM computers ORDER BY created_at DESC"
    );
    return result.rows;
  },

  async getById(id: number): Promise<Computer | null> {
    const result = await pool.query("SELECT * FROM computers WHERE id = $1", [
      id,
    ]);
    return result.rows[0] || null;
  },

  async getByLabId(labId: number): Promise<Computer[]> {
    const result = await pool.query(
      "SELECT * FROM computers WHERE lab_id = $1 ORDER BY created_at DESC",
      [labId]
    );
    return result.rows;
  },

  async create(data: CreateComputerRequest): Promise<Computer> {
    const result = await pool.query(
      "INSERT INTO computers (nombre, lab_id) VALUES ($1, $2) RETURNING *",
      [data.nombre, data.lab_id]
    );
    return result.rows[0];
  },

  async update(
    id: number,
    data: UpdateComputerRequest
  ): Promise<Computer | null> {
    const result = await pool.query(
      "UPDATE computers SET nombre = COALESCE($1, nombre), lab_id = COALESCE($2, lab_id), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *",
      [data.nombre, data.lab_id, id]
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM computers WHERE id = $1", [
      id,
    ]);

    if (!result.rowCount) {
      return false;
    }

    return true;
  },
};
