import api from "./axios.js";

// DASHBOARD
export const getAdminDashboard = () =>
  api.get("/v1/admin/dashboard");

// ASSIGN TASK
export const assignTask = (data) =>
  api.post("/v1/admin/tasks", data);

// UPDATE TASK
export const updateTask = (taskId, data) =>
  api.put(`/v1/admin/tasks/${taskId}`, data);

// DELETE TASK
export const deleteTask = (taskId) =>
  api.delete(`/v1/admin/tasks/${taskId}`);

// ✅ GET ALL USERS
export const getAllUsers = () =>
  api.get("/v1/admin/getalluser");

// MAKE ADMIN
export const makeUserAdmin = (email) =>
  api.patch("/v1/admin/makeadmin", { email });
