import express from "express";
import { uploadAttachment, getAttachment } from "../controllers/attachmentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/:ticketId", authMiddleware, uploadAttachment);
router.get("/:id", authMiddleware, getAttachment);

export default router;
