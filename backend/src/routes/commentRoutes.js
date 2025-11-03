import express from "express";
import {
  addComment,
  getCommentsByTicket,
  deleteComment
} from "../controllers/commentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:ticketId", authMiddleware, addComment);
router.get("/:ticketId", authMiddleware, getCommentsByTicket);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
