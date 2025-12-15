import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import db from "../db/index.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // store refresh token in DB
    user.refreshToken = refreshToken;

    // skip validation because password, etc. are unchanged
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while generating tokens"
    );
  }
};


const registeruser = asyncHandler(async (req, res) => {
  //step01  fetch data from frontend
  const { name, email, password } = req.body;
  console.log("email", email);

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      "Password must be 8–16 characters, include at least 1 uppercase letter and 1 special character"
    );
  }
  // user exist or not
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "Email is already registered !");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log("User is registered", {
    name,
    email,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      name,
      email,
    },
  });

  // get data from body
  // validation adds
  // check if user already exist
  // create user object - create entry in DB
  // remove password and refresh token field
  // check for user creation
  // return res
});

const loginuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "Email is not registered. Please register first.");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(user._id);

  // Set tokens in cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
});


const logoutuser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized request");
  }

  await User.findByIdAndUpdate(
    userId,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

 res
  .clearCookie("accessToken")
  .clearCookie("refreshToken")
  .status(200)
  .json({
    success: true,
    message: "Logged out successfully",
  });

});


const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user?._id;

  if ([oldPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});


const completeTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  // Find task assigned to this user only
  const task = await Task.findOne({
    _id: taskId,
    assignedTo: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found or not assigned to you");
  }

  // If already completed
  if (task.status === "COMPLETED") {
    throw new ApiError(400, "Task already completed");
  }

  // Mark as completed
  task.status = "COMPLETED";
  task.completedAt = new Date();

  await task.save();

  res.status(200).json({
    success: true,
    message: "Task marked as completed",
    task,
  });
});

const getMyTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    pending: tasks.filter(t => t.status === "PENDING"),
    completed: tasks.filter(t => t.status === "COMPLETED"),
  });
});



export { registeruser, loginuser, logoutuser, updatePassword, completeTask, getMyTasks};
