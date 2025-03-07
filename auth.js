import { expressjwt } from "express-jwt";

function authJwt() {
    const secret = process.env.SECRET;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            { url: "/products(.*)", methods: ["GET", "OPTIONS"] },
            { url: "/categories(.*)", methods: ["GET", "OPTIONS"] },
            { url: "/user/login", methods: ["POST"] },
            { url: "/user", methods: ["POST"] },
        ],
    });
}

async function isRevoked(req, token) {
    if (!token.payload.isAdmin) {
        return true; 
    }
    return false; 
}


export default authJwt;
