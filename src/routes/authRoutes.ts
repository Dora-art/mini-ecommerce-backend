import { Router } from "express";
import { registerUser } from "../controllers/auth/signup";
import { test } from "../controllers/auth/testController";
import { auth } from "../middlewares/authMiddleware";
import { loginUser } from "../controllers/auth/login";

const authRoutes = Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/test", auth, test);

export default authRoutes;
