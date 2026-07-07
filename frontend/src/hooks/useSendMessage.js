import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const API = "https://real-time-chat-application-52rd.onrender.com";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);

	const {
		messages,
		setMessages,
		selectedConversation,
	} = useConversation();

	const sendMessage = async (message) => {
		setLoading(true);

		try {
			const token = localStorage.getItem("token");

			const res = await fetch(
				`${API}/api/messages/send/${selectedConversation._id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
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

	return { loading, sendMessage };
};

export default useSendMessage;