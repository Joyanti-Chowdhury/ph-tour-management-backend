/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import {ZodObject} from "zod";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middlewares/validatemiddleware";





const router = Router()

router.post("/register",
     async(req:Request ,res:Response,next:NextFunction) =>{

validateRequest(createUserZodSchema)

    //  req.body = await createUserZodSchema.parseAsync(req.body)
    //  console.log(req.body)
     next()
},UserControllers.createUser)

router.get("/all-users", UserControllers.getAllUsers)



export const UserRoutes = router

