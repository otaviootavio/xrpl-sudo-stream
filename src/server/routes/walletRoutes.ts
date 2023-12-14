import express from 'express';
import { walletController } from '../controllers/walletControllers';

const walletRoutes = express.Router();

walletRoutes.post('/create', walletController.createFromSeed);
walletRoutes.post('/sign', walletController.signTransaction);
walletRoutes.post('/submit', walletController.submitSignedTransaction);
walletRoutes.post('/payment', walletController.paymentAmmountFromSeed);
walletRoutes.get('/generate', walletController.generateWallet);
walletRoutes.post('/balances', walletController.getBalances);

export default walletRoutes;
