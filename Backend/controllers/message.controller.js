import Message from "../models/message.model.js";
import Ticket from "../models/ticket.model.js";

export const addMessageToTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { text } = req.body;
        console.log(req.user,"checkuser")

        //Check if ticket exists
        const ticket = await Ticket.findOne({ ticketId });
        console.log(ticket, 'Ticket!!')
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        //Create Message
        const newMessage = new Message({
            ticketId: ticket._id,
            senderId: req.user.userId,
            text
        })
        // console.log(newMessage,"NewMessage")
        await newMessage.save();
        res.status(201).json({
            message: "Message added",
            chat: newMessage
        });

    } catch (error) {
        res.status(500).json({
            message: "Message added",
            error: error.message
        });
    }
}

//Get All Messages for a Ticket
export const getAllMessages = async (req, res) => {
    try {
        const { ticketId } = req.params;

        //Find Actual Ticket

        const ticket = await Ticket.findOne({ ticketId });

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        //Find message using internal ObjectId
        const messages = await Message.find({ ticketId: ticket._id })
            .sort({ timestamp: 1 })
            .populate("senderId", "name email");

        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
