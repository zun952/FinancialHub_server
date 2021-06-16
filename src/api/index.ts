import { Router } from "express";
import auth from "./routes/auth";
import coins from "./routes/coins";

const app = Router();
auth(app);
coins(app);

export default app;