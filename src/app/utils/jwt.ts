import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateToken = (payload :JwtPayload , secret: string, expiresIn : string) => {
  console.log(secret , payload, expiresIn ,"secret")
    const token = jwt.sign(payload, secret, {expiresIn:expiresIn} as jwt.SignOptions)
     return token;
}


 export const verifyToken  = (token: string, secret: string) => {
  console.log(token ,secret)
   const verifiedToken = jwt.verify(token,secret);
 
   return verifiedToken
}