import { Router } from "express";
import { assignTicket, createTicket, getAllTickets, getTicketById, updateTicketStatus } from "../controllers/ticket.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const ticketRoutes = Router();

ticketRoutes.get("/", isAuthenticated, getAllTickets);
ticketRoutes.get("/:ticketId", getTicketById);
ticketRoutes.patch("/:ticketId/status", isAuthenticated, updateTicketStatus);
ticketRoutes.post("/createTicket", createTicket);
ticketRoutes.put("/assign/:ticketId", isAuthenticated, assignTicket);


export default ticketRoutes;
