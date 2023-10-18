import express, { Express, Request, Response } from "express";
import cors from "cors";

const PORT: number = 7500;
const app: Express = express();

app.use(cors());

app.get("/test", (req: Request, res: Response) => {
  res.json({ title: "ProxiPoll (Fetched!)" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}...`);
});
