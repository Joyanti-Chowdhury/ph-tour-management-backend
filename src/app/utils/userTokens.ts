import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { isActive, IUser } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { generateToken, verifyToken } from "./jwt";
import AppError from "../errorHelpers/appError";
import httpStatus from 'http-status-codes';

 export const createUserToken = (user: Partial<IUser>) => { 

    const jwtPayload = {
        userId:user._id,
        email:user.email,
        role:user.role
    }
    
    const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)
    
    const refreshToken = generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET , envVars.JWT_ACCESS_EXPIRES)

    return{
        accessToken,
        refreshToken
    }
}

export const createNewAccessTokenWithRefreshToken = async(refreshToken : string) => {
 
    const verifiedRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload;
   const isUserExist = await User.findOne({email : verifiedRefreshToken.email})

          if(!isUserExist){
              throw new AppError(httpStatus.BAD_REQUEST,"User dose not exist")
          }
          if(isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE){
              throw new AppError(httpStatus.BAD_REQUEST,`user  is ${isUserExist.isActive}`)
          }
          if(isUserExist.isDeleted){
              throw new AppError(httpStatus.BAD_REQUEST,"User is deleted")
          }

// const isPassWordMatch = await  bycriptjs.compare(password as string, isUserExist.password as string)

// if(!isPassWordMatch){
//   throw new AppError(httpStatus.BAD_REQUEST,"Password does not match")
// }

const jwtPayload = {
    userId:isUserExist._id,
    email:isUserExist.email,
    role:isUserExist.role
}

const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)


return {
    accessToken 
}


}