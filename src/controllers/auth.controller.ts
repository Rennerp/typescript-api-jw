import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";

export const signUp = async (request: Request, response: Response) => {
  // Saving user
  const user: IUser = new User({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
  });
  user.password = await user.encryptPassword(user.password);

  const savedUser = await user.save();
  // Token
  const token: string = jwt.sign(
    { _id: savedUser._id },
    process.env.TOKEN_SECRET || "tokentest"
  );

  response.header("auth-token", token).json(savedUser);
};

export const signIn = async (request: Request, response: Response) => {
  const user = await User.findOne({ email: request.body.email });

  if (!user) return response.status(400).json("Email or password wrong");

  const correctPassword: boolean = await user.validatePassword(
    request.body.password
  );

  if (!correctPassword) return response.status(400).json("Invalid Password");

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET || "tokentest",
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  response.header("auth-token", token).send("Login");
};

export const profile = async (request: Request, response: Response) => {
  const user = await User.findById(request.userId, { password: 0 });

  if (!user) return response.status(404).json("No user found");
  response.json(user);
};
