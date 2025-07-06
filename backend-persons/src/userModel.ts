import pool from './database';
import { User, CreateUserRequest, UpdateUserRequest } from './types';
import bcrypt from 'bcryptjs';

export const findAllUsers = async (): Promise<User[]> => {
  const query = 'SELECT * FROM users WHERE rol = $1 ORDER BY created_at DESC';
  const result = await pool.query(query, ['user']);
  return result.rows;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE id = $1 AND rol = $2';
  const result = await pool.query(query, [id, 'user']);
  return result.rows[0] || null;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const result = await pool.query(query, [email]);
  return result.rows[0] || null;
};

export const findUserByCedula = async (cedula: string): Promise<User | null> => {
  const query = 'SELECT * FROM users WHERE cedula = $1';
  const result = await pool.query(query, [cedula]);
  return result.rows[0] || null;
};

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  
  const query = `
    INSERT INTO users (nombre, email, password, rol, cedula, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING *
  `;
  
  const values = [
    userData.nombre,
    userData.email,
    hashedPassword,
    'user',
    userData.cedula
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updateUser = async (id: number, userData: UpdateUserRequest): Promise<User | null> => {
  const fields = [];
  const values = [];
  let paramCount = 1;

  if (userData.nombre) {
    fields.push(`nombre = $${paramCount++}`);
    values.push(userData.nombre);
  }

  if (userData.email) {
    fields.push(`email = $${paramCount++}`);
    values.push(userData.email);
  }

  if (userData.password) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    fields.push(`password = $${paramCount++}`);
    values.push(hashedPassword);
  }

  if (userData.cedula) {
    fields.push(`cedula = $${paramCount++}`);
    values.push(userData.cedula);
  }

  if (fields.length === 0) {
    return null;
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const query = `
    UPDATE users 
    SET ${fields.join(', ')} 
    WHERE id = $${paramCount} AND rol = 'user'
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const query = 'DELETE FROM users WHERE id = $1 AND rol = $2';
  const result = await pool.query(query, [id, 'user']);
  return (result.rowCount || 0) > 0;
};
