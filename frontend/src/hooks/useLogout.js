import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
	const [loading, setLoading] = useState(false);

	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);

		localStorage.removeItem("chat-user");
		localStorage.removeItem("token");

		setAuthUser(null);

		setLoading(false);
	};

	return { loading, logout };
};

export default useLogout; 