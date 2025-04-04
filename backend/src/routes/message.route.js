import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import User from "../models/user.model.js"; // ✅ Import User model

const router = express.Router();

router.get("/user", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.get("/users", protectRoute, async (req, res) => {
    try {
      const users = await User.find({}, "fullName profilePic email"); // Fetch all users with selected fields
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

router.post("/send/:id", protectRoute, sendMessage);

export default router;