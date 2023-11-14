import express from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../auth-middleware";

const userRoutes = express.Router();

userRoutes.post("/", authMiddleware, userController.createNewUser);
// userRoutes.put('/users/:uid', authMiddleware, userController.updateUser);

userRoutes.put("/:uid/wallets", userController.addWalletsToUser);
userRoutes.get("/:uid/wallets", userController.getWalletsFromUser);
userRoutes.delete("/:uid/wallets", userController.deleteWalletsFromUser);

userRoutes.delete("/:uid", userController.deleteUser);
userRoutes.get("/:uid", userController.getUserByUID);
userRoutes.get("/", userController.listAllUsers);

export default userRoutes;
