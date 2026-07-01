import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);

	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const login = async (username, password) => {
		setLoading(true);

		try {
			const res = await fetch(
				"https://real-time-chat-application-52rd.onrender.com/api/auth/login",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify({
						username,
						password,
					}),
				}
			);

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}

			localStorage.setItem(
				"chat-user",
				JSON.stringify(data)
			);

			setAuthUser(data);

			toast.success("Login successful");

			// redirect after login
			navigate("/");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;