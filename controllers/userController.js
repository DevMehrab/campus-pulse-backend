import User from "../models/User.js";
import {
  deleteUserService,
  getUserService,
  updateUserProfileService,
} from "../services/userService.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const updateUserProfile = async (req, res) => {
  try {
    const result = await updateUserProfileService(req.user.id, req.body);
    res.json({
      result,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update profile", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await getUserService(userId);
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await deleteUserService(req.params.userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};
