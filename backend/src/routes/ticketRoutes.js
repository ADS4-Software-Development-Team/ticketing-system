Tebelelo
// Ticket routes
import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} from "../controllers/ticketController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Regular users can create & view their tickets
router.post("/", authMiddleware, createTicket);
router.get("/", authMiddleware, getTickets);
router.get("/:id", authMiddleware, getTicketById);

// Only agents/admins can update or delete
router.put("/:id", authMiddleware, roleMiddleware(["agent", "admin"]), updateTicket);
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteTicket);
=======
import express from "express";
import { createTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket);
 main

export default router;
