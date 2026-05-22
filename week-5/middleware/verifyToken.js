import jwt from 'jsonwebtoken';



export const verifyToken = async (req, res, next) => {
    //read token from req
    let token = req.cookies.token;
    //verify token
    if (!token) {
        return res.status(401).json({ message: "plz login" })
    }

    try {
        //verify the validate the token(decoding the token)
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        //attach decoded data to req for use in next middleware
        req.user = decoded;
        //forward request to next   
        next();
    } catch (error) {
        //handle token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "token expired, plz login again" })
        }
        //handle invalid token
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "invalid token, plz login again" })
        }
        //handle other errors
        return res.status(500).json({ message: "token verification failed" })
    }
}