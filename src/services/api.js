import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data.token;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const fetchUsers = async (page) => {
  try {
    const response = await axios.get(`${BASE_URL}/users?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const updateUser = async (id, data) => {
  try {
    await axios.put(`${BASE_URL}/users/${id}`, data);
  } catch (error) {
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/users/${id}`);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
