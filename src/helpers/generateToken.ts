import JWT from "jsonwebtoken";

export default function generateToken(id: string) {
  return JWT.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}
