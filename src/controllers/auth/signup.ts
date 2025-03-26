import { Request, Response } from "express";
import pool from "../../config/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import generateToken from "../../utils/jwtUtils";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const parsedBody = bodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      res.status(400).json({
        message: "Invalid request body",
        errors: parsedBody.error.errors,
      });
      return;
    }

    const body = parsedBody.data;
    const { name, email, password } = body;
    // if (!name || name.trim() == '' || !email || !password) {
    //   return res.status(400).json({ message: "All fields are required" });
    // }

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      res.status(400).json({ message: "User aleady exists in the database" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email,password) VALUES ($1, $2,$3) RETURNING id,name,email",
      [name, email, hashedPassword]
    );

    const user = newUser.rows[0];
    const token = generateToken({id: user.id, email: user.email});
    res.status(201).json({ message: "User created successfully",token,
      user: {
        id:user.id,
        name: user.name,    
        email: user.email,
      }
     });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const bodySchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().trim().min(6),
});
