/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { UserServices } from "../user/user.service";
import { AuthServices } from "./auth.service";
import { User } from "../user/user.model";

const credentialsLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {


  const loginInfo = await AuthServices.credentialsLogin(req.body)


  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "user Logged in successfully",
    data: loginInfo
  })

})


export const AuthControllers = {
    credentialsLogin
}