import express from 'express';
import { walletController } from '../controllers/walletControllers';

const walletRoutes = express.Router();

walletRoutes.post('/create', walletController.createFromSeed);
walletRoutes.post('/sign', walletController.signTransaction);
walletRoutes.post('/submit', walletController.submitSignedTransaction);
walletRoutes.get('/generate', walletController.generateWallet);

export default walletRoutes;
