const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const {
  registerUserService,
  loginUserService,
  getMeService,
} = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await loginUserService(req.body.email, req.body.password);

    res.json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await getMeService(req.user, req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
