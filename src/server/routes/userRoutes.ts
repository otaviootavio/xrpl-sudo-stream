import express from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../auth-middleware';

const userRoutes = express.Router();

userRoutes.post('/users', authMiddleware, userController.createNewUser);
// userRoutes.put('/users/:uid', authMiddleware, userController.updateUser);

userRoutes.put('/users/:uid/wallets', authMiddleware, userController.addWalletsToUser);
userRoutes.get('/users/:uid/wallets', authMiddleware, userController.getWalletsFromUser);
userRoutes.delete('/users/:uid/wallets', authMiddleware, userController.deleteWalletsFromUser);

userRoutes.delete('/users/:uid', authMiddleware, userController.deleteUser);
userRoutes.get('/users/:uid', authMiddleware, userController.getUserByUID);
userRoutes.get('/users', userController.listAllUsers);

export default userRoutes;