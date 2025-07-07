import type { Computer } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchComputers = async (): Promise<Computer[]> => {
  const response = await apiClient.get<Computer[]>("/computers");
  return response.data;
};

export const fetchComputersByLab = async (
  labId: number
): Promise<Computer[]> => {
  const response = await apiClient.get<Computer[]>(
    `/computers?lab_id=${labId}`
  );
  return response.data;
};

export const createComputer = async (
  computer: Omit<Computer, "id">
): Promise<Computer> => {
  const response = await apiClient.post<Computer>("/computers", computer);
  return response.data;
};

export const updateComputer = async (
  id: number,
  computer: Partial<Computer>
): Promise<Computer> => {
  const response = await apiClient.put<Computer>(`/computers/${id}`, computer);
  return response.data;
};

export const deleteComputer = async (id: number): Promise<void> => {
  await apiClient.delete(`/computers/${id}`);
};
