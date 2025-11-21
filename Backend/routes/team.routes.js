import { Router } from "express";
import { createTeamMember, deleteTeamMember, getTeamMembers, updateTeamMemberRole } from "../controllers/manageTeam.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const teamRoutes = Router();

teamRoutes.get("/", isAuthenticated, getTeamMembers);
teamRoutes.post("/createMember", isAuthenticated, createTeamMember);
teamRoutes.put("/:memberId", isAuthenticated, updateTeamMemberRole)
teamRoutes.delete("/:memberId", isAuthenticated, deleteTeamMember)

export default teamRoutes;
