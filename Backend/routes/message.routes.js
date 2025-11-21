import { Router } from "express";
import { addMessageToTicket, getAllMessages } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const messageRoutes = Router();

messageRoutes.post("/:ticketId", isAuthenticated, addMessageToTicket);
messageRoutes.get("/:ticketId", isAuthenticated, getAllMessages);

export default messageRoutes;
