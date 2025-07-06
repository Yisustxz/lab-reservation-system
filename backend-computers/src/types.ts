import Joi from "joi";

export interface Lab {
  id: number;
  nombre: string;
  created_at: Date;
  updated_at: Date;
}

export interface Computer {
  id: number;
  nombre: string;
  lab_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLabRequest {
  nombre: string;
}

export interface CreateComputerRequest {
  nombre: string;
  lab_id: number;
}

export interface UpdateLabRequest {
  nombre?: string;
}

export interface UpdateComputerRequest {
  nombre?: string;
  lab_id?: number;
}

export const createLabSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).required(),
});

export const createComputerSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).required(),
  lab_id: Joi.number().integer().positive().required(),
});

export const updateLabSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).optional(),
}).min(1);

export const updateComputerSchema = Joi.object({
  nombre: Joi.string().min(1).max(100).optional(),
  lab_id: Joi.number().integer().positive().optional(),
}).min(1);
