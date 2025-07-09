import type { Computer, Lab } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchLabs = async (): Promise<Lab[]> => {
  const response = await apiClient.get<Lab[]>("/api/labs");
  return response.data;
};

export const fetchLabById = async (id: number): Promise<Lab> => {
  const response = await apiClient.get<Lab>(`/api/labs/${id}`);
  return response.data;
};

export const createLab = async (
  labData: Omit<Lab, "id" | "created_at" | "updated_at">
): Promise<Lab> => {
  const response = await apiClient.post<Lab>("/api/labs", labData);
  return response.data;
};

export const updateLab = async (
  id: number,
  labData: Partial<Omit<Lab, "id" | "created_at" | "updated_at">>
): Promise<Lab> => {
  const response = await apiClient.put<Lab>(`/api/labs/${id}`, labData);
  return response.data;
};

export const deleteLab = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/labs/${id}`);
};

export const fetchComputersByLab = async (
  labId: number
): Promise<Computer[]> => {
  const response = await apiClient.get<Computer[]>(
    `/api/labs/${labId}/computers`
  );
  return response.data;
};
