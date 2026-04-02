import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

const formatAuthResponse = (user) => ({
  token: generateToken(user._id),
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    res.status(409);
    throw new Error("An account with that email already exists");
  }

  const user = await User.create({ name, email: normalizedEmail, password });

  res.status(201).json(formatAuthResponse(user));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json(formatAuthResponse(user));
});
