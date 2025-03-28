import { Request, Response } from "express";
import pool from "../../config/db";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/jwtUtils";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userData = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userData.rows.length === 0) {
      res.status(400).json({ message: "Invalid credentials" });
    }

    const user = userData.rows[0];

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
