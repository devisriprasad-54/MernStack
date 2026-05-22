import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
export function verifytoken(req, res, next) {
   //token verfication logic here


   //1.get token request
   let signedToken = req.cookies.token; //contains tokens as the key and value pairs
   if (!signedToken) {
      return res.status(401).json({ message: "Access denied,login first" });
   }

   //2.verify token
   let decodedToken = jwt.verify(signedToken, 'secret')
   console.log("decodeToken: ",decodedToken);
   next()


}