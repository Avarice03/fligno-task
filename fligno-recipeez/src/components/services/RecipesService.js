import axios from "axios";

// const BASE_URL = "https://flignorecipeez-api.onrender.com/api/v1";
const BASE_URL = "http://localhost:3069/api/v1";

export const getAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/admin/users`);
  return data;
};

export const getUserDetails = async () => {
  const { data } = await axios.get(`${BASE_URL}/user`);
  return data;
};

export const getFavoriteRecipes = async () => {
  const { data } = await axios.get(`${BASE_URL}/recipes`);
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

export const addFavorite = async (recipe) => {
  const response = await axios.post(`${BASE_URL}/recipes`, recipe);
  return response;
};

export const updateUserDetails = async (userDetails) => {
  const response = await axios.put(`${BASE_URL}/user`, userDetails);
  return response;
};

export const removeFavorite = async (recipe) => {
  const response = await axios.put(`${BASE_URL}/recipes`, recipe);
  return response;
};

export const deleteUser = async () => {
  const response = await axios.delete(`${BASE_URL}/user`);
  return response;
};
