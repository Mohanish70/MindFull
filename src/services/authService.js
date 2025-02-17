import api from "./api";

export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  localStorage.setItem("token", response.data.token);
};

export const register = async (data) => {
  await api.post("/auth/register", data);
};
