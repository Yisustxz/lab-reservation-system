export interface User {
  id: number;
  nombre: string;
  email: string;
  cedula: string;
  rol: "user" | "administrador" | "encargado";
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Lab {
  id: number;
  nombre: string;
  created_at?: Date;
  updated_at?: Date;
  computers?: Computer[];
}

export interface Computer {
  id: number;
  nombre: string;
  lab_id: number;
  created_at?: Date;
  updated_at?: Date;
  lab?: Lab;
  reservations?: Reservation[];
}

export interface Reservation {
  id: number;
  user_id: number;
  computer_id: number;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  duracion?: number;
  estado?: "pendiente" | "confirmada" | "cancelada";
  created_at?: Date;
  updated_at?: Date;
  computer?: Computer;
}

export interface ReservationWithDetails extends Reservation {
  user?: User;
  computer?: Computer & {
    lab?: Lab;
  };
}
