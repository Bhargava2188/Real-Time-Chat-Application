import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = "https://real-time-chat-application-52rd.onrender.com";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);

			try {
				const token = localStorage.getItem("token");

				const res = await fetch(`${API}/api/users`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || data.message);
				}

				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};

export default useGetConversations;