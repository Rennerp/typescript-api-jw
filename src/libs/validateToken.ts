import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const TokenValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("auth-token");

  if (!token) return response.status(401).json("Access Denied");
  const payload = jwt.verify(
    token,
    process.env.TOKEN_SECRET || "tokentest"
  ) as IPayload;

  request.userId = payload._id;
  next();
};
