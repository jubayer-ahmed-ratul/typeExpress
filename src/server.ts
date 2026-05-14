import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const port = 5000;

app.use(express.json()); //middlewire
app.use(express.text()); //middlewire
app.use(express.urlencoded({ extended: true }));

//GET METHOD
app.get("/", (req: Request, res: Response) => {
  // res.send("server is running!");
  res.status(200).json({
    message: "Server is running",
    author: "Jubayer",
  });
});

//POST METHOD
app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  res.status(201).json({
    message: "Created",
    data: {
      name,
      email,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
