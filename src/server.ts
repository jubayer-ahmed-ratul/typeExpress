import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { Pool } from "pg";
const app: Application = express();
const port = 5000;

app.use(express.json()); //middlewire
app.use(express.text()); //middlewire
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_pkBgUX60SwDO@ep-wild-sunset-aqrd20vc-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`
      
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(20) NOT NULL,
      is_active BOOLEAN DEFAULT true,
      age INT,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
      `);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
initDB();

//GET METHOD
app.get("/", (req: Request, res: Response) => {
  // res.send("server is running!");
  res.status(200).json({
    message: "Server is running",
    author: "Jubayer",
  });
});

//POST METHOD
app.post("/api/users", async (req: Request, res: Response) => {
  // console.log(req.body);

  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `
    INSERT INTO users(name, email, password,age) VALUES($1,$2,$3,$4) RETURNING *
    `,
      [name, email, password, age],
    );
    console.log(result);
    res.status(201).json({
      message: "Created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
});

//GET ALL users
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result=await pool.query(`
      SELECT * FROM users
      `)
      res.status(200).json(
        {
          success: true,
          message:"users retrived successfully",
          data:result.rows,
        }
      )
    
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message: error.message,
      error: error,
    });
    
  }
});

//GET single users
app.get('/api/users/:id',async(req: Request, res: Response)=>{

  const {id}=req.params;
  // console.log(id);
  try {
    const result=await pool.query(`
      SELECT * FROM users WHERE id=$1
      `,[id]);
if (result.rows.length===0) {
  res.status(500).json(
        {
          success: true,
          message:"user not found",
          data:{},
        }
      )
  
}

    return  res.status(200).json(
        {
          success: true,
          message:"user retrived successfully",
          data:result.rows[0],
        }
      )
      // console.log(result);
    
  } catch (error:any) {
    res.status(500).json({
      success:false,
      message: error.message,
      error: error,
    });
  }

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
