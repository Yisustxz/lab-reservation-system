import type { Reservation } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchReservations = async (): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>("/reservations");
  return response.data;
};

export const createReservation = async (
  reservation: Omit<Reservation, "id">
): Promise<Reservation> => {
  const response = await apiClient.post<Reservation>(
    "/reservations",
    reservation
  );
  return response.data;
};

export const updateReservation = async (
  id: number,
  reservation: Partial<Reservation>
): Promise<Reservation> => {
  const response = await apiClient.put<Reservation>(
    `/reservations/${id}`,
    reservation
  );
  return response.data;
};

export const deleteReservation = async (id: number): Promise<void> => {
  await apiClient.delete(`/reservations/${id}`);
};
