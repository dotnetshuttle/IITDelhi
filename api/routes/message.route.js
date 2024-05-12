import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get/:id", verifyToken, getMessages);
router.post("/send/:id", verifyToken, sendMessage);

export default router;
