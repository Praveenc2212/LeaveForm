import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { DB } from "./server/connections/DB.connections.js";

import AuthRouter from "./server/routers/auth.routers.js";

const app = express();
configDotenv();
const PORT = process.env.PORT;
DB.connect(process.env.MONGO_DB_URL);

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    })
);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/auth", AuthRouter);

app.get("/auth/signup", (req, res) => {
    res.status(200).send("SignUp Page");
});

app.listen(PORT, () =>
    console.log(`Server is Running on : http://localhost:${PORT}`)
);
