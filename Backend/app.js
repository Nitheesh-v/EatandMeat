import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import cors from "cors";

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://eatand-meat.vercel.app",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("EatAndMeat API Running...");
});

export default app;