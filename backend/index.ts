import express, { Express, Request, Response } from "express";
import { Pool, PoolClient, QueryResult } from "pg";
import cors from "cors";

const PORT: number = 7500;
const app: Express = express();

app.use(cors());

const pool: Pool = new Pool({
  user: "proxipoll",
  host: "localhost",
  database: "proxipoll",
  password: "proximity",
  port: 5432,
});

// async function checkDatabaseExistence() {
//   const client = await pool.connect();
//   try {
//     const checkDatabaseQuery =
//       "SELECT dummy_number FROM proxi_poll_main.test";

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
      "SELECT dummy_number FROM proxi_poll_main.test"
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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
