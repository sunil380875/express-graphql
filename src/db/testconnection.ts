import pool from "./db.js";

async function connectDB() {
  try {
    const client = await pool.connect();

    console.log("Database Connected");

    client.release();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;