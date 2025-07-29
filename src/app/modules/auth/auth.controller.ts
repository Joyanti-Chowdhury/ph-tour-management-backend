/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { UserServices } from "../user/user.service";
import { AuthServices } from "./auth.service";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from '../../utils/setToken';

const credentialsLogin = catchAsync(async(req: Request, res: Response, next: NextFunction) => {


  const loginInfo = await AuthServices.credentialsLogin(req.body)

// res.cookie("accessToken",loginInfo.accessToken,{
//   httpOnly: true,
//   secure: false
// })

 setAuthCookie(res,loginInfo)
  // res.cookie("refreshToken",loginInfo.refreshToken,{
  //   httpOnly:true,
  //   secure:false
  // })

  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "user Logged in successfully",
    data: loginInfo
  })

})

const getNewAccessToken  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

  const refreshToken = req.cookies.refreshToken


  if(!refreshToken) {
    throw  new AppError(httpStatus.BAD_REQUEST, "No refresh token found in cookies")
  }
  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)


// res.cookie("accessToken",tokenInfo.accessToken,{
//   httpOnly: true,
//   secure: false
// })

// todo :  setAuthCookie(res,tokenInfo)
 setAuthCookie(res, tokenInfo )


  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "user Logged in successfully",
    data: tokenInfo
  })

})


export const AuthControllers = {
    credentialsLogin,
    getNewAccessToken
}