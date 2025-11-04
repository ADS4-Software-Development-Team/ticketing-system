import express from "express";
import {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} from "../controllers/ticketController.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All ticket routes require a user to be logged in
router.use(authMiddleware);

router.route('/').post(createTicket).get(getTickets); // All logged in users can create/get tickets
router.route('/:id').get(getTicketById).put(updateTicket).delete(adminMiddleware, deleteTicket); // Only admins can delete

export default router;
