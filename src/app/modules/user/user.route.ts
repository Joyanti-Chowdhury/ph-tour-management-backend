/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import {  object, ZodObject } from "zod";
import { createUserZodSchema, updateUserZodSchema,  } from './user.validation';
import { validateRequest } from "../../middlewares/validateMiddleware";
import AppError from "../../errorHelpers/appError";
// import { validateRequest } from "../../middlewares/validatemiddleware";
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Role } from "./user.interface";
import { verify } from "crypto";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { checkAuth } from "../../middlewares/checkAuth";
import { AuthControllers } from "../auth/auth.controller";

const router = Router();



  
// checkAuth()


// router.post("/register",
//      async(req:Request ,res:Response,next:NextFunction) =>{

// validateRequest(createUserZodSchema)

//     //  req.body = await createUserZodSchema.parseAsync(req.body)
//     //  console.log(req.body)
//      // next()
// },UserControllers.createUser)
router.post(
  "/register",  validateRequest(createUserZodSchema),
  UserControllers.createUser);





router.get(
  "/all-users",
//   async (req: Request, res: Response, next: NextFunction) =>{
// try {
//      const accessToken = req.headers.authorization;

//      if(!accessToken){
//           throw new AppError(httpStatus.BAD_REQUEST,"Access token is required")
//      }

//      const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET)
 
//      // if(!verifiedToken){
//      //      console.log(verifiedToken)
//      //      throw new AppError(httpStatus.BAD_REQUEST,`You are not authorized to access this route ${verifiedToken}`)
//      // }
//      if((verifiedToken as JwtPayload).role !==  Role.ADMIN){
//           throw new AppError(httpStatus.BAD_REQUEST,"You are not authorized to access this route")
//      }
//      console.log(verifiedToken)
//      next()
// } catch (error) {
//      console.log("JWT ERROR",error)
//      next(error)
// }
//   },
checkAuth(Role.ADMIN , Role.SUPER_ADMIN),
    UserControllers.getAllUsers
);

router.patch("/:id",validateRequest(updateUserZodSchema), checkAuth(Role.ADMIN,Role.SUPER_ADMIN),UserControllers.updateUser)

export const UserRoutes = router;
