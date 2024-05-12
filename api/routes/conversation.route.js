import express from "express";
import {
  getChats,
  getConversationUsers,
} from "../controllers/conversation.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", verifyToken, getChats);
router.get("/existing", verifyToken, getConversationUsers);

export default router;
