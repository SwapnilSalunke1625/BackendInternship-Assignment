import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const adminDashboard = asyncHandler(async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalTasks: tasks.length,
    tasks,
  });
});


export const assignTask = asyncHandler(async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !userId) {
    throw new ApiError(400, "Title and userId are required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const task = await Task.create({
    title,
    description,
    assignedTo: userId,
    assignedBy: req.user._id, 
  });

  res.status(201).json({
    success: true,
    message: "Task assigned successfully",
    task,
  });
});


export const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // ✅ Only update allowed fields
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    task,
  });
});




export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  // 🔒 Only admin who assigned the task can delete
  if (task.assignedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this task");
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});


export const getUsersAssignedByMe = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedBy: req.user._id })
    .populate("assignedTo", "name email role");

  if (!tasks.length) {
    return res.status(200).json({
      success: true,
      message: "No tasks assigned by you yet",
      users: [],
    });
  }

  // Remove duplicate users
  const uniqueUsersMap = new Map();

  tasks.forEach(task => {
    const user = task.assignedTo;
    uniqueUsersMap.set(user._id.toString(), user);
  });

  const users = Array.from(uniqueUsersMap.values());

  res.status(200).json({
    success: true,
    totalUsers: users.length,
    users,
  });
});

export const makeUserAdminByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  // Prevent changing role if already admin
  if (user.role === "ADMIN") {
    throw new ApiError(400, "User is already an admin");
  }

  // Optional: prevent admin from promoting himself
  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot change your own role");
  }

  user.role = "ADMIN";
  await user.save();

  res.status(200).json({
    success: true,
    message: "User promoted to admin successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("_id name email role createdAt")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    totalUsers: users.length,
    users,
  });
});




