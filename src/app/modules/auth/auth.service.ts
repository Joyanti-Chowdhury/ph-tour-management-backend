import AppError from "../../errorHelpers/appError";
import { isActive, IUser } from "../user/user.interface"
import httpStatus from 'http-status-codes';
import { User } from "../user/user.model";
import bycriptjs from 'bcryptjs';

import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserToken } from '../../utils/userTokens';
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = async (payload : Partial<IUser>) => {
    const {password ,  email} = payload
   const isUserExist = await User.findOne({email})

          if(!isUserExist){
              throw new AppError(httpStatus.BAD_REQUEST,"User dose not exist")
          }

const isPassWordMatch = await  bycriptjs.compare(password as string, isUserExist.password as string)

if(!isPassWordMatch){
  throw new AppError(httpStatus.BAD_REQUEST,"Password does not match")
}

// const jwtPayload = {
//     userId:isUserExist._id,
//     email:isUserExist.email,
//     role:isUserExist.role
// }

// const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)

// const refreshToken = generateToken(jwtPayload,envVars.JWT_REFRESH_SECRET , envVars.JWT_ACCESS_EXPIRES)


const userToken = createUserToken(isUserExist)

// delete isUserExist.password

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {password:pass , ...rest} = isUserExist.toObject()
return {
    accessToken : userToken.accessToken,
    refreshToken : userToken.refreshToken,
    user: rest
}
}
const getNewAccessToken  = async (refreshToken : string) => {


   const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
     
//     const verifiedRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload;
//    const isUserExist = await User.findOne({email : verifiedRefreshToken.email})

//           if(!isUserExist){
//               throw new AppError(httpStatus.BAD_REQUEST,"User dose not exist")
//           }
//           if(isUserExist.isActive === isActive.BLOCKED || isUserExist.isActive === isActive.INACTIVE){
//               throw new AppError(httpStatus.BAD_REQUEST,`user  is ${isUserExist.isActive}`)
//           }
//           if(isUserExist.isDeleted){
//               throw new AppError(httpStatus.BAD_REQUEST,"User is deleted")
//           }

// const jwtPayload = {
//     userId:isUserExist._id,
//     email:isUserExist.email,
//     role:isUserExist.role
// }

// const accessToken = generateToken(jwtPayload,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRES)


// return {
//     accessToken 
// }


return{
    accessToken : newAccessToken
}
}




export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}