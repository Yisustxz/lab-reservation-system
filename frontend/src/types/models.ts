export interface User {
  id: number;
  nombre: string;
  email: string;
  cedula: string;
  rol: "admin" | "docente" | "estudiante";
  password?: string;
}
export interface Lab {
  id: number;
  nombre: string;
}

export interface Computer {
  id: number;
  nombre: string;
  lab_id: number;
}

export interface Reservation {
  id: number;
  user_id: number;
  computer_id: number;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  duracion: number;
  estado: "pendiente" | "confirmada" | "cancelada";
}
