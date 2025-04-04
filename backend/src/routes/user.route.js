import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsers } from "../controllers/message.controller.js"; 

const router = express.Router();

router.get("/", protectRoute, getUsers);

export default router;
