import api from "./axios.js";

// GET my tasks
export const getMyTasks = () =>
  api.get("/v1/users/my-tasks");

// COMPLETE task
export const completeTask = (taskId) =>
  api.patch(`/v1/users/tasks/${taskId}/complete`);
