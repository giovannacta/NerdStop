import { expressjwt } from "express-jwt";
import dotenv from "dotenv";

dotenv.config();

function authJwt() {
  const secret = process.env.SECRET;

  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: "/api/products", methods: ["GET", "OPTIONS"] },
      { url: "/api/categories", methods: ["GET", "OPTIONS"] },
      { url: "/api/users", methods: ["POST"] }, 
      { url: "/api/users/login", methods: ["POST"] }, 
    ],
  });
}

async function isRevoked(req, token) {
  return !token.payload; 
}

export default authJwt;
