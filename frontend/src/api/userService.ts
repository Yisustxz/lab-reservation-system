import type { User } from "../types/models";
import apiClient from "../utils/apiClient";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/users");
  return response.data;
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  const response = await apiClient.post<User>("/users", user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const response = await apiClient.put<User>(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
