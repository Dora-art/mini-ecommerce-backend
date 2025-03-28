import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
      console.error(
        "Error: JWT_SECRET is not defined in the environment variables"
      );
      res.status(500).json({ message: "Internal server error" });
      return
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return
  }
};
