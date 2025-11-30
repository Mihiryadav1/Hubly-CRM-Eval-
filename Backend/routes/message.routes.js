import { Router } from "express";
import { addMessageToTicket, addMessageToTicketForTeam, getAllMessages, getAverageReplyTime, getLastMessageForTicket, getWeeklyMissedChats } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js"
const messageRoutes = Router();

messageRoutes.get("/missedchats", getWeeklyMissedChats);
messageRoutes.get("/lastMessage/:ticketId", getLastMessageForTicket);
messageRoutes.get("/avgReplyTime", getAverageReplyTime);
messageRoutes.post("/:ticketId", addMessageToTicket);
messageRoutes.post("/team/:ticketId", isAuthenticated, addMessageToTicketForTeam);
messageRoutes.get("/:ticketId", getAllMessages);

export default messageRoutes;
