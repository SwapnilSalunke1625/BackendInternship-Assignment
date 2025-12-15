import api from "./axios.js";


export const getAdminDashboard = () =>
  api.get("/v1/admin/dashboard");


export const assignTask = (data) =>
  api.post("/v1/admin/tasks", data);

export const updateTask = (taskId, data) =>
  api.put(`/v1/admin/tasks/${taskId}`, data);

export const deleteTask = (taskId) =>
  api.delete(`/v1/admin/tasks/${taskId}`);


export const getAllUsers = () =>
  api.get("/v1/admin/getalluser");

export const makeUserAdmin = (email) =>
  api.patch("/v1/admin/makeadmin", { email });
