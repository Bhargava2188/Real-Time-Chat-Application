import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

// SEND MESSAGE
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.user._id;

        // Find existing conversation
        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId],
            },
        });

        // Create new conversation if not exists
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        // Create message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Push message into conversation
        conversation.messages.push(newMessage._id);

        // Save both in parallel
        await Promise.all([
            newMessage.save(),
            conversation.save(),
        ]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log(
            "Error in sendMessage controller:",
            error.message
        );

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// GET MESSAGES
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;

        const senderId = req.user._id;

        const conversation =
            await Conversation.findOne({
                participants: {
                    $all: [
                        senderId,
                        userToChatId,
                    ],
                },
            }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(
            conversation.messages
        );

    } catch (error) {
        console.log(
            "Error in getMessages controller:",
            error.message
        );

        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};