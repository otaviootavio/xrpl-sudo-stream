import { getMessage } from "../models/helloModel";
import { Request, Response } from 'express';

export const helloController = async (req:Request, res:Response) => {
  const message = await getMessage();
  res.send(message);
};
