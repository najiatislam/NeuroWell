import express from "express";
import { 
  getGroupSessions, 
  joinSession, 
  leaveSession, 
  getUserSessions 
} from "../controllers/therapyController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route - anyone can view available sessions
router.get("/group-sessions", getGroupSessions);

// Protected routes - only logged in users can access these
router.post("/join-session", authMiddleware, joinSession);
router.post("/leave-session", authMiddleware, leaveSession);
router.get("/user-sessions", authMiddleware, getUserSessions);

export default router;
