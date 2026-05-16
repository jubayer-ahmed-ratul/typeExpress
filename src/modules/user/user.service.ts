import { Result } from "pg";
import { pool } from "../../db";
import type { typeofUser } from "./user.interface";

//CREATE USER --POST
const createUserIntoDB = async (payload: typeofUser) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `INSERT INTO users(name, email, password, age) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, password, age],
  );
  return result;
};

//ALL USERS --GET
const getAllusersfromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

//SINGLE USER --GET
const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
  return result;
};

//UPDATE USER --PUT
const updateUserInfofromDB = async (payload: typeofUser, id: string) => {
  const { name, is_active, password, age } = payload;
  const result = await pool.query(
    `UPDATE users SET
        name=COALESCE($1, name),
        password=COALESCE($2, password),
        age=COALESCE($3, age),
        is_active=COALESCE($4, is_active)
      WHERE id=$5 RETURNING *`,
    [name, password, age, is_active, id],
  );
  return result;
};

//DELETE USER --DELETE
const deleteuserfromDB = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    id,
  ]);
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllusersfromDB,
  getSingleUser,
  updateUserInfofromDB,
  deleteuserfromDB,
};
