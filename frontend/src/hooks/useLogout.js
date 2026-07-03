import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();

	const logout = async () => {
		setLoading(true);

		try {
			const res = await fetch(
				"https://real-time-chat-application-52rd.onrender.com/api/auth/logout",
				{
					method: "POST",
					credentials: "include",
				}
			);

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || data.message);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);

			toast.success("Logged out");

			navigate("/login");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};

export default useLogout;