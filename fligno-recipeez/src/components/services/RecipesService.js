import axios from "axios";

// const BASE_URL = "https://recipeez-api.onrender.com";
const BASE_URL = "http://localhost:3069/api/v1";

export const getUserDetails = async () => {
  const { data } = await axios.get(`${BASE_URL}/user`);
  return data;
};

export const loginUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/login`, user);
  return response;
};

export const addUser = async (user) => {
  const response = await axios.post(`${BASE_URL}/signup`, user);
  return response;
};

export const updateUserDetails = async (userDetails) => {
  const response = await axios.put(`${BASE_URL}/user`, userDetails);
  return response;
};

export const deleteUser = async () => {
  const response = await axios.delete(`${BASE_URL}/user`);
  return response;
};