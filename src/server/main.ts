import express from "express";
import ViteExpress from "vite-express";
import { helloController } from "./controllers/helloController";


const app = express();

app.get("/hello", helloController);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
