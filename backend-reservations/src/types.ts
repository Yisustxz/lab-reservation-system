import Joi from "joi";

export interface Reservation {
  id: number;
  user_id: number;
  computer_id: number;
  fecha: string;
  hora: string;
  duracion: number;
  estado: "pendiente" | "confirmada" | "cancelada" | "completada";
  created_at: Date;
  updated_at: Date;
}

export interface CreateReservationData {
  user_id: number;
  computer_id: number;
  fecha: string;
  hora: string;
  duracion: number;
  estado?: "pendiente" | "confirmada" | "cancelada" | "completada";
}

export interface UpdateReservationData {
  user_id?: number;
  computer_id?: number;
  fecha?: string;
  hora?: string;
  duracion?: number;
  estado?: "pendiente" | "confirmada" | "cancelada" | "completada";
}

export const createReservationSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  computer_id: Joi.number().integer().positive().required(),
  fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  hora: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
  duracion: Joi.number().integer().min(1).max(8).required(),
  estado: Joi.string()
    .valid("pendiente", "confirmada", "cancelada", "completada")
    .optional(),
});

export const updateReservationSchema = Joi.object({
  user_id: Joi.number().integer().positive().optional(),
  computer_id: Joi.number().integer().positive().optional(),
  fecha: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  hora: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .optional(),
  duracion: Joi.number().integer().min(1).max(8).optional(),
  estado: Joi.string()
    .valid("pendiente", "confirmada", "cancelada", "completada")
    .optional(),
});

export interface ReservationWithDetails extends Reservation {
  user_name?: string;
  user_email?: string;
  computer_name?: string;
  lab_name?: string;
}
