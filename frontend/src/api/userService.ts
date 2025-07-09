import type { User } from "../types/models";
import apiClient from "../utils/apiClient";

interface UserResponse {
  success: boolean;
  data: User;
  message: string;
}

interface UsersResponse {
  success: boolean;
  data: User[];
  message: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<UsersResponse>("/api/users");
  return response.data.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<UserResponse>(`/api/users/${id}`);
  return response.data.data;
};

export const createUser = async (
  userData: Omit<User, "id" | "created_at" | "updated_at">
): Promise<User> => {
  const response = await apiClient.post<UserResponse>("/api/users", userData);
  return response.data.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<Omit<User, "id" | "created_at" | "updated_at">>
): Promise<User> => {
  const response = await apiClient.put<UserResponse>(
    `/api/users/${id}`,
    userData
  );
  return response.data.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/users/${id}`);
};
