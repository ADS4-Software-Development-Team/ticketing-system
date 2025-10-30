// User routes
import express from "express";
import { getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["admin"]), getAllUsers);
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateUser);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteUser);

export default router;
