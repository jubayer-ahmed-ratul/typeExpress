import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRoute } from "./modules/user/user.routes";
import { profileRouter } from "./modules/profile/profile.routes";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// GET 
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running",
    author: "Jubayer",
  });
});

//  user
app.use("/api/users", userRoute);

//  profie
app.use("/api/profile", profileRouter );

export default app;
