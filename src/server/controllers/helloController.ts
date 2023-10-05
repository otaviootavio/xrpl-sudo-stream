import { getMessage } from "../models/helloModel";
import { Request, Response } from 'express';

export const helloController = (req:Request, res:Response) => {
  const message = getMessage();
  res.send(message);
};
