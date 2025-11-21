import User from "../models/users.model.js";
import bcrypt from "bcryptjs";

//Create Team Members
export const createTeamMember = async (req, res) => {
    try {
        //Only admin can create team members
        console.log("check role", req.user)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admin can create team members." });
        }
        const { name, email, password, role } = req.body;

        //Fields validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        //Check if user exists already
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }
        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new team member
        const teamMember = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        });
        // Remove password from response
        const savedMember = await teamMember.save();
        const memberResponse = savedMember.toObject();
        delete memberResponse.password;

        res.status(201).json({
            message: "Team member created successfully",
        })

    } catch (error) {
        res.status(500).json({
            message: "Error creating team member",
        })
    }
}

//Get All Team Members
export const getTeamMembers = async (req, res) => {
    try {

        //Only admin can view team members
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admin can view team members." });
        }
        const teamMembers = await User.find({ role: { $ne: "admin" } }).select("-password");
        res.status(200).json({
            message: "Team members fetched successfully",
            teamMembers
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching team members",
            error: error.message
        });
    }
}

// Delete Team Members
export const deleteTeamMember = async (req, res) => {
    try {
        const { memberId } = req.params

        //Only admin can delete team members
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        //Check if member exists
        const member = await User.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Team member not found" });
        }
        //Prevent Deleting Admin
        if (member.role === "admin") {
            return res.status(403).json({ message: "Cannot delete admin" });
        }

        await User.findByIdAndDelete(memberId);
        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting team member",
            error: error.message
        });
    }
}

//Update Team Member Roles
export const updateTeamMemberRole = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { role } = req.body;

        //Only admin can update the roles
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied: Admins only" })
        }

        //Check if member exists
        const memberToUpdate = await User.findById(memberId);
        if (!memberToUpdate) {
            return res.status(404).json({ message: "Team member not found" });
        }

        //Update Role
        memberToUpdate.role = role;
        await memberToUpdate.save()

    } catch (error) {
        res.status(500).json({
            message: "Error updating team member role",
            error: error.message
        });
    }
}
