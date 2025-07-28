import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs'
import { envVars } from "../../config/env";
import { JwtPayload } from 'jsonwebtoken';


const createUser = async (payload : Partial<IUser>) => {
          const {password,  email, ...rest} = payload


          const isUserExist = await User.findOne({email})

          if(isUserExist){
              throw new AppError(httpStatus.BAD_REQUEST,"User already exist")
          }


          const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))
       

//   const isPassWordMatch = await  bycriptjs.compare("123Riya#", hashedPassword)


const authProvider : IAuthProvider = {
    provider: "credentials",
    providerId: email as string 
}


       
        const user = await User.create({
       auths: [authProvider],
       email,
       password: hashedPassword,
       ...rest
    })


    return user
}


const updateUser = async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload) => {

     const ifUserExist = await User.findById(userId)
     if(!ifUserExist){
        throw new AppError(httpStatus.NOT_FOUND,"User does not exist")
     }

    //  if(ifUserExist.isDeleted || ifUserExist.isActive=== isActive.BLOCKED){
    //     throw new AppError(httpStatus.FORBIDDEN,"This user can be updated")
    //  }


/*
email:cannot be updated
name,phone,picture,role,isDeleted,isActive, isVerified,
password:rehash
only admin super admin - role , isDelete
promoting to super admin

*/ 

if(payload.role){
    if(decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE){
        throw new AppError(httpStatus.FORBIDDEN,"You are not authorized to access this route")
    }
    if(payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN ){
        throw new AppError(httpStatus.FORBIDDEN,"You are not authorized to access this route")
    }
    if(payload.isActive || payload.isDeleted || payload.isVerified){
        throw new AppError(httpStatus.FORBIDDEN,"You are not authorized to access this route")
    }
}

if(payload.password){
    payload.password = await bcryptjs.hash(payload.password  as string, Number(envVars.BCRYPT_SALT_ROUND))
}

const newUpdatedUser = await User.findByIdAndUpdate(userId,payload,{new:true,runValidators:true})
return newUpdatedUser
}



const getAllUsers = async () => {
    const users = await User.find({});
   const totalUsers = await User.countDocuments()

    return{
       data: users,
        meta:{
            total: totalUsers
        }
    }
}


export const UserServices = {
    createUser,
    getAllUsers,
    updateUser
}