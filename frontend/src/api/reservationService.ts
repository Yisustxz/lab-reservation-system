import type { Reservation, ReservationWithDetails } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchReservations = async (): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>("/api/reservations");
  return response.data;
};

export const fetchReservationsWithDetails = async (): Promise<
  ReservationWithDetails[]
> => {
  const response = await apiClient.get<ReservationWithDetails[]>(
    "/api/reservations/details"
  );
  return response.data;
};

export const fetchReservationById = async (
  id: number
): Promise<Reservation> => {
  const response = await apiClient.get<Reservation>(`/api/reservations/${id}`);
  return response.data;
};

export const fetchReservationsByUser = async (
  userId: number
): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>(
    `/api/reservations/user/${userId}`
  );
  return response.data;
};

export const fetchReservationsByComputer = async (
  computerId: number
): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>(
    `/api/reservations/computer/${computerId}`
  );
  return response.data;
};

export const fetchReservationsByStatus = async (
  status: string
): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>(
    `/api/reservations/status/${status}`
  );
  return response.data;
};

export const createReservation = async (
  reservationData: Omit<Reservation, "id" | "created_at" | "updated_at">
): Promise<Reservation> => {
  const response = await apiClient.post<Reservation>(
    "/api/reservations",
    reservationData
  );
  return response.data;
};

export const updateReservation = async (
  id: number,
  reservationData: Partial<
    Omit<Reservation, "id" | "created_at" | "updated_at">
  >
): Promise<Reservation> => {
  const response = await apiClient.put<Reservation>(
    `/api/reservations/${id}`,
    reservationData
  );
  return response.data;
};

export const deleteReservation = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/reservations/${id}`);
};
