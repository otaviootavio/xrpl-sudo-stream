import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import { User } from "../models/userTypes";

export const userController = {
  createNewUser: async (req: Request, res: Response) => {
    try {
      const userRecord = await userModel.createNewUser(req.body as User);
      res.status(201).json({ uid: userRecord.uid });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  updateUser: async (req: Request, res: Response) => {
    const { uid } = req.params;
    try {
      const userRecord = await userModel.updateUser(uid, req.body);
      res.status(200).json(userRecord.toJSON());
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { uid } = req.params;
    try {
      await userModel.deleteUser(uid);
      res.status(200).json({ message: "Successfully deleted user" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
  listAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userModel.listAllUsers();
      res.status(200).json(users.map((user) => user.toJSON()));
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    }
  },
};
