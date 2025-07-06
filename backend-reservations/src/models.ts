import pool from "./database";
import {
  CreateReservationData,
  Reservation,
  ReservationWithDetails,
  UpdateReservationData,
} from "./types";

export const reservationModel = {
  async getAll(): Promise<Reservation[]> {
    const result = await pool.query(
      "SELECT * FROM reservations ORDER BY fecha DESC, hora DESC"
    );
    return result.rows;
  },

  async getById(id: number): Promise<Reservation | null> {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE id = $1",
      [id]
    );
    return result.rows[0] || null;
  },

  async getByComputerId(computerId: number): Promise<Reservation[]> {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE computer_id = $1 ORDER BY fecha DESC, hora DESC",
      [computerId]
    );
    return result.rows;
  },

  async getByUserId(userId: number): Promise<Reservation[]> {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE user_id = $1 ORDER BY fecha DESC, hora DESC",
      [userId]
    );
    return result.rows;
  },

  async getWithDetails(): Promise<ReservationWithDetails[]> {
    const result = await pool.query(`
      SELECT 
        r.*,
        u.nombre as user_name,
        u.email as user_email,
        c.nombre as computer_name,
        l.nombre as lab_name
      FROM reservations r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN computers c ON r.computer_id = c.id
      LEFT JOIN labs l ON c.lab_id = l.id
      ORDER BY r.fecha DESC, r.hora DESC
    `);
    return result.rows;
  },

  async create(data: CreateReservationData): Promise<Reservation> {
    const result = await pool.query(
      `INSERT INTO reservations (user_id, computer_id, fecha, hora, duracion, estado) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [
        data.user_id,
        data.computer_id,
        data.fecha,
        data.hora,
        data.duracion,
        data.estado || "pendiente",
      ]
    );
    return result.rows[0];
  },

  async update(
    id: number,
    data: UpdateReservationData
  ): Promise<Reservation | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (data.user_id !== undefined) {
      fields.push(`user_id = $${paramCount++}`);
      values.push(data.user_id);
    }
    if (data.computer_id !== undefined) {
      fields.push(`computer_id = $${paramCount++}`);
      values.push(data.computer_id);
    }
    if (data.fecha !== undefined) {
      fields.push(`fecha = $${paramCount++}`);
      values.push(data.fecha);
    }
    if (data.hora !== undefined) {
      fields.push(`hora = $${paramCount++}`);
      values.push(data.hora);
    }
    if (data.duracion !== undefined) {
      fields.push(`duracion = $${paramCount++}`);
      values.push(data.duracion);
    }
    if (data.estado !== undefined) {
      fields.push(`estado = $${paramCount++}`);
      values.push(data.estado);
    }

    if (fields.length === 0) {
      return null;
    }

    fields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE reservations SET ${fields.join(
        ", "
      )} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query("DELETE FROM reservations WHERE id = $1", [
      id,
    ]);
    return (result.rowCount ?? 0) > 0;
  },

  async checkAvailability(
    computerId: number,
    fecha: string,
    hora: string,
    excludeReservationId?: number
  ): Promise<boolean> {
    let query = `
      SELECT COUNT(*) as count 
      FROM reservations 
      WHERE computer_id = $1 
        AND fecha = $2 
        AND hora = $3 
        AND estado IN ('pendiente', 'confirmada')
    `;
    const params: (string | number)[] = [computerId, fecha, hora];

    if (excludeReservationId) {
      query += ` AND id != $4`;
      params.push(excludeReservationId);
    }

    const result = await pool.query(query, params);
    return parseInt(result.rows[0].count) === 0;
  },

  async getByDateRange(
    startDate: string,
    endDate: string,
    computerId?: number
  ): Promise<Reservation[]> {
    let query = `
      SELECT * FROM reservations 
      WHERE fecha >= $1 AND fecha <= $2
    `;
    const params: (string | number)[] = [startDate, endDate];

    if (computerId) {
      query += ` AND computer_id = $3`;
      params.push(computerId);
    }

    query += ` ORDER BY fecha ASC, hora ASC`;

    const result = await pool.query(query, params);
    return result.rows;
  },

  async getByStatus(status: string): Promise<Reservation[]> {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE estado = $1 ORDER BY fecha DESC, hora DESC",
      [status]
    );
    return result.rows;
  },
};
