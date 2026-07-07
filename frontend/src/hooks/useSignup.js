import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const API = "https://real-time-chat-application-52rd.onrender.com";

const useSignup = () => {
	const [loading, setLoading] = useState(false);

	const { setAuthUser } = useAuthContext();

	const navigate = useNavigate();

	const signup = async ({
		fullName,
		username,
		password,
		confirmPassword,
		gender,
	}) => {
		const success = handleInputErrors({
			fullName,
			username,
			password,
			confirmPassword,
			gender,
		});

		if (!success) return;

		setLoading(true);

		try {
			const res = await fetch(`${API}/api/auth/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName,
					username,
					password,
					confirmPassword,
					gender,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error);
			}

			localStorage.setItem("chat-user", JSON.stringify(data));
			localStorage.setItem("token", data.token);

			setAuthUser(data);

			toast.success("Signup successful");

			navigate("/");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors({
	fullName,
	username,
	password,
	confirmPassword,
	gender,
}) {
	if (
		!fullName ||
		!username ||
		!password ||
		!confirmPassword ||
		!gender
	) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}