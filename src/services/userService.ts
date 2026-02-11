import axios from "axios";
import { User } from "../types/User";

const API_URL = "http://localhost:3000/users";

// 🔥 Get All Users
export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 🔥 Create User
export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// 🔥 Update User
export const updateUser = async (
  id: number,
  user: User
): Promise<User> => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// 🔥 Delete User
export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
