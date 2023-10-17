import express, {Express, Request, Response} from "express";

const PORT = 7500;
const app: Express = express();

app.get("/test", (req: Request, res: Response) => {
    res.json({ title: "ProxiPoll (fetched from backend!)" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}...`);
});
