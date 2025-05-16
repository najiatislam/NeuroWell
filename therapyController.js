import GroupTherapy from "../models/groupTherapyModel.js";
import userModel from "../models/userModel.js";

// Get all group therapy sessions
export const getGroupSessions = async (req, res) => {
  try {
    const sessions = await GroupTherapy.find({}).sort({ createdAt: -1 });
    res.json({ success: true, sessions });
  } catch (error) {
    console.error("Error fetching group sessions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Join a group therapy session
export const joinSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.userId;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID is required" });
    }

    // Validate session ID format
    if (!sessionId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid session ID format" });
    }

    // Find the session
    const session = await GroupTherapy.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if user already joined
    if (session.participantIds.includes(userId)) {
      return res.json({ 
        success: true, 
        message: "You are already registered for this session",
        meetingLink: session.meetingLink
      });
    }

    // Check if session is full
    if (session.currentParticipants >= session.maxParticipants) {
      return res.status(400).json({ success: false, message: "Session is full" });
    }

    // Add user to session
    session.participantIds.push(userId);
    session.currentParticipants += 1;
    await session.save();

    res.json({ 
      success: true, 
      message: "Successfully joined the session",
      meetingLink: session.meetingLink
    });
  } catch (error) {
    console.error("Error joining session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Leave a group therapy session
export const leaveSession = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const userId = req.userId;

    if (!sessionId) {
      return res.status(400).json({ success: false, message: "Session ID is required" });
    }

    // Find the session
    const session = await GroupTherapy.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Check if user is in the session
    if (!session.participantIds.includes(userId)) {
      return res.status(400).json({ success: false, message: "You are not registered for this session" });
    }

    // Remove user from session
    session.participantIds = session.participantIds.filter(id => id.toString() !== userId.toString());
    session.currentParticipants = Math.max(0, session.currentParticipants - 1);
    await session.save();

    res.json({ success: true, message: "Successfully left the session" });
  } catch (error) {
    console.error("Error leaving session:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get user's joined sessions
export const getUserSessions = async (req, res) => {
  try {
    const userId = req.userId;
    
    const sessions = await GroupTherapy.find({
      participantIds: userId
    }).sort({ createdAt: -1 });
    
    res.json({ success: true, sessions });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
