import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { Pool, PoolClient, QueryResult } from "pg";

// Read and initialize environment variables.
dotenv.config({path: "../.env"});

// Initialize the Express applicaiton and its middleware.
const app: Express = express();
app.use(cors());

// Initialize a new PostgreSQL connection pool.
const pool: Pool = new Pool({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
});

// async function checkDatabaseExistence() {
//   const client = await pool.connect();
//   try {
//     const checkDatabaseQuery =
//       "SELECT dummy_number FROM proxipoll_accounts.test";

//     const result = await client.query(checkDatabaseQuery);
//     const tableExists = result.rows[0].exists;

//     if (result.rows.length > 0) {
//       const dummyNumber = result.rows[0].dummy_number;
//       console.log(`The 'dummy_number' from the 'test' table is: ${dummyNumber}`);
//     } else {
//       console.log("The 'test' database relation does not exist.");
//     }
//   } catch (err) {
//     console.error("Error checking database existence", err);
//   }
//   client.release();
// }
// checkDatabaseExistence();

app.get("/test", async (req: Request, res: Response) => {
  try {
    const client: PoolClient = await pool.connect();
    const result: QueryResult = await client.query(
      "SELECT dummy_number FROM proxipoll_accounts.test"
    );
    const number: number = result.rows[0].dummy_number;
    res.json({ number });
    client.release();
    console.log(res);
  } catch (err) {
    console.error("Error fetching number from the database", err);
    res.status(500).send("Error fetching number from the database");
  }
});

app.listen(+process.env.BACKEND_PORT, () => {
  console.log(`Server listening on port ${process.env.BACKEND_PORT}...`);
});
