import AppError from "../../errorHelpers/appError";
import { IUser } from "../user/user.interface"
import httpStatus from 'http-status-codes';
import { User } from "../user/user.model";
import bycriptjs from 'bcryptjs';

import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload : Partial<IUser>) => {
    const {password,  email} = payload
   const isUserExist = await User.findOne({email})

          if(!isUserExist){
              throw new AppError(httpStatus.BAD_REQUEST,"User dose not exist")
          }

const isPassWordMatch = await  bycriptjs.compare(password as string, isUserExist.password as string)

if(!isPassWordMatch){
  throw new AppError(httpStatus.BAD_REQUEST,"Password does not match")
}

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


export const AuthServices = {
    credentialsLogin
}