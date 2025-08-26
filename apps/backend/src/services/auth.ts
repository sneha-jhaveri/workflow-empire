import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "devsupersecret";

export function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    throw new Error("Invalid token");
  }
}
