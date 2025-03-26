import { NextFunction, Request, Response } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  
  next();
};
