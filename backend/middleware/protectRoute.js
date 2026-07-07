import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				message: "Unauthorized: No token provided",
			});
		}

		const token = authHeader.split(" ")[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(401).json({
				message: "User not found",
			});
		}

		req.user = user;

		next();
	} catch (error) {
		console.log("Protect Route Error:", error.message);

		res.status(500).json({
			message: "Internal Server Error",
		});
	}
};

export default protectRoute;