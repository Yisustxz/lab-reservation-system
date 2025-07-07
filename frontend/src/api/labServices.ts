import type { Lab } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchLabs = async (): Promise<Lab[]> => {
  const response = await apiClient.get("/labs");
  return response.data as Lab[];
};

export const createLab = async (lab: Omit<Lab, "id">): Promise<Lab> => {
  const response = await apiClient.post<Lab>("/labs", lab);
  return response.data;
};

export const updateLab = async (
  id: number,
  lab: Partial<Lab>
): Promise<Lab> => {
  const response = await apiClient.put<Lab>(`/labs/${id}`, lab);
  return response.data;
};

export const deleteLab = async (id: number): Promise<void> => {
  await apiClient.delete(`/labs/${id}`);
};
