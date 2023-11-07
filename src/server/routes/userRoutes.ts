import express from 'express';
import { userController } from '../controllers/userController';

const userRoutes = express.Router();

userRoutes.post('/users', userController.createNewUser);
userRoutes.put('/users/:uid', userController.updateUser);
userRoutes.delete('/users/:uid', userController.deleteUser);
userRoutes.get('/users', userController.listAllUsers);

export default userRoutes;