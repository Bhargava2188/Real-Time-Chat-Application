import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const API = "https://real-time-chat-application-52rd.onrender.com";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);

	const {
		messages,
		setMessages,
		selectedConversation,
	} = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);

			try {
				const token = localStorage.getItem("token");

				const res = await fetch(
					`${API}/api/messages/${selectedConversation._id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || data.message);
				}

				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) {
			getMessages();
		}
	}, [selectedConversation]);

	return { loading, messages };
};

export default useGetMessages;