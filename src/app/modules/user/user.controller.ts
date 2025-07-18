/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import {  } from "./user.model";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponse";

// import AppError from "../../errorHelpers/appError";
 

// const createUserFunction = async(req: Request, res: Response, next: NextFunction) => {
//   const user = await UserServices.createUser(req.body)

//   res.status(httpStatus.CREATED).json({
//     message: "user created successfully",
//      user
//   })
// }





// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {


//     // throw new Error ("something went wrong")
//   // throw new AppError(httpStatus.BAD_REQUEST,"user already exist")
//       const user = await UserServices.createUser(req.body)


//     res.status(httpStatus.CREATED).json({
//       message: "user created successfully",
//        user
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.log(error);
//   next(error)
//   }
// };


const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
  const user = await UserServices.createUser(req.body);


  // res.status(httpStatus.CREATED).json({
  //   message: "user created successfully",
  //    user
  // });

  sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success: true,
    message: "user created successfully",
    data: user
  })

})

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
       const result = await UserServices.getAllUsers()
  //  res.status(httpStatus.OK).json({
  //   success: true,
  //      message: "All users fetched successfully",
  //      users
  //  })

 
  sendResponse(res,{
    statusCode: httpStatus.CREATED,
    success: true,
    message: "All users retrieved successfully",
    data: result.data,
    meta: result.meta
  })
})





 export const UserControllers = {
    createUser,
    getAllUsers
}


function err(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}
//route matching -> controller -> service -> model -> DB