import type { Computer } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchComputers = async (): Promise<Computer[]> => {
  const response = await apiClient.get<Computer[]>("/api/computers");
  return response.data;
};

export const fetchComputerById = async (id: number): Promise<Computer> => {
  const response = await apiClient.get<Computer>(`/api/computers/${id}`);
  return response.data;
};

export const createComputer = async (
  computerData: Omit<Computer, "id" | "created_at" | "updated_at">
): Promise<Computer> => {
  const response = await apiClient.post<Computer>(
    "/api/computers",
    computerData
  );
  return response.data;
};

export const updateComputer = async (
  id: number,
  computerData: Partial<Omit<Computer, "id" | "created_at" | "updated_at">>
): Promise<Computer> => {
  const response = await apiClient.put<Computer>(
    `/api/computers/${id}`,
    computerData
  );
  return response.data;
};

export const deleteComputer = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/computers/${id}`);
};
