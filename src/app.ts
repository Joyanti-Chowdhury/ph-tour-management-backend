/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from "express";
import {  } from './app/modules/user/user.route';
import cors from 'cors'
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandelar";
import httpStatus from 'http-status-codes';
import { success } from "zod";
import notFound from "./app/middlewares/notFound";



const app  = express();

app.use(express.json())
app.use(cors())

app.use("/api/v1",router)


app.get("/", (req:Request, res:Response) => {
   res.status(200).json({
    message:"welcome to Tour Management System Backend"
   })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;