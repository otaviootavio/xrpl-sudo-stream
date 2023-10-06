import express from "express";
import ViteExpress from "vite-express";
import { helloController } from "./controllers/helloController";
import walletRoutes from "./routes/walletRoutes";

const app = express();

app.get("/hello", helloController);
app.use('/wallet', walletRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
