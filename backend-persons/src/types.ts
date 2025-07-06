import Joi from 'joi';

export interface User {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'user' | 'admin';
  cedula: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateUserRequest {
  nombre: string;
  email: string;
  password: string;
  cedula: string;
}

export interface UpdateUserRequest {
  nombre?: string;
  email?: string;
  password?: string;
  cedula?: string;
}

export const createUserSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  cedula: Joi.string().min(8).max(20).required()
});

export const updateUserSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  cedula: Joi.string().min(8).max(20).optional()
}).min(1); 