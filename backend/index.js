import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

import AuthRouter from "./server/routers/auth.routers.js";
import { DB } from "./server/connections/DB.connections.js";

const app = express();
configDotenv();
DB.connect(process.env.MONGO_DB_URL);

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.STATUS === "development"
            ? "http://localhost:5173"
            : "https://Example.app.com",
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    })
);

app.get("/", (req, res) => res.send("Hello,World! From Backend"));

app.use("/auth", AuthRouter);

// 404 Page Not Found...
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
