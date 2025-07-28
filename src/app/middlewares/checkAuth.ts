import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/appError";
import httpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "Access token is required");
      }

      const verifiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      // console.log(accessToken)
      // if(!verifiedToken){
      //      console.log(verifiedToken)
      //      throw new AppError(httpStatus.BAD_REQUEST,`You are not authorized to access this route ${verifiedToken}`)
      // }
      if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "You are not authorized to access this route"
        );
      }

      req.user = verifiedToken;

      // console.log(verifiedToken);
      next();
    } catch (error) {
      // console.log("JWT ERROR", error);
      next(error);
    }
  };
