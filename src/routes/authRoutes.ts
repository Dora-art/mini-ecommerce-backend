import { Router } from "express";
import { registerUser } from "../controllers/auth/signup";
import { loginUser } from "../controllers/auth/login";
import { changePassword } from "../controllers/auth/changePassword";
import { auth } from "../middlewares/authMiddleware";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/change-password",auth, changePassword);

export default authRoutes;
