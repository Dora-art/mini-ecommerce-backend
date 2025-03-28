import jwt from "jsonwebtoken";

interface Tokenpayload{
  [key: string]: any;
}
const generateToken = (payload: Tokenpayload) => {
    const secretKey = process.env.JWT_SECRET as string;
    if (!secretKey) {
        console.error(
          "Error: JWT_SECRET is not defined in the environment variables."
        );
      }
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
    return token;
    
};

export default generateToken;