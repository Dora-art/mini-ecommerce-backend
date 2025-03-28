import pool from "../../config/db";
import { Request, Response } from "express";
import bcrypt from "bcryptjs"


export const changePassword = async (req: Request, res: Response) => {
    try{
        const{currentPassword, newPassword} = req.body;
        const userId = req.user.id;

        const userData = await pool.query("SELECT * FROM users WHERE id = $1", [userId])

        if(userData.rows.length === 0){
          res.status(404).json({message: "User does not exist"})
          return;
        }
        const user = userData.rows[0]

        if(!(await bcrypt.compare(currentPassword, user.password))){
             res.status(401).json({message: "Current password is incorrect"})
             return
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        await pool.query("UPDATE users SET password =$1 WHERE id = $2", [hashedPassword,userId])

        res.status(200).json({message: "Password updated successfully"})
    }
    catch(err){
console.error(err)
res.status(500).json({message: "Internal server error"})
    }
}