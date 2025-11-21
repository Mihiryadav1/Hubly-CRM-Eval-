import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "No Token Provided",
            success: false
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        //verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedToken,'decoded')
        req.user = decodedToken;
        next();

    } catch (error) {
        console.log("JWT Verification Error: ", error.message)
        return res.status(401).json({ message: "Invalid Token", success: false })
    }
}