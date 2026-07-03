import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const API = "https://real-time-chat-application-52rd.onrender.com";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);

		try {
			const res = await fetch(
				`${API}/api/messages/send/${selectedConversation._id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({ message }),
				}
			);

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || data.message);
			}

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};

export default useSendMessage;