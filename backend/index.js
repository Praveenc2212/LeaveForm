// Maximum Effort...

// Importing modules...
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import AuthRouter from "./server/routers/auth.routers.js";
import DB from "./server/connections/DB.connections.js";
import FormRouter from "./server/routers/form.routers.js";

// Configurations...
configDotenv();

// Connections...
DB.connect(process.env.MONGO_DB_URL);

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security Middlewares...
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '16mb' }));

// Rate Limiter...
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Logging...
app.use(morgan(process.env.STATUS === "development" ? "dev" : "combined"));

// Body Parsing & Cookie Parsing...
app.use(express.json());
app.use(cookieParser());

// CORS Configuration...
app.use(
    cors({
        origin:
            process.env.STATUS === "development"
                ? "http://localhost:5173"
                : "https://example.app.com",
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    })
);

// Static Files Access...
app.use(express.static(path.join(__dirname, "public")));

// Routes...
app.get("/", (req, res) => res.send("Hello, World! From Backend"));

// Authentication Routes...
app.use("/auth", AuthRouter);

// Form Routes...
app.use("/api/form", FormRouter);

// 404 Page Not Found...
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use((err, req, res) => {
    console.error("Error occurred:", err.stack || err);
    res.status(500).json({
        success: false,
        message:
            process.env.STATUS === "development"
                ? err.message
                : "Internal Server Error",
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});