import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["unresolved", "resolved"], default: "unresolved" },
}, { timestamps: true });

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
