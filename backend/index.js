import express from "express";
const app = express();
const PORT = 1247;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/auth/login", (req, res) => {
    res.status(200).send("Login Page");
});

app.get("/auth/signup", (req, res) => {
    res.status(200).send("SignUp Page");
});

app.listen(PORT, () =>
    console.log(`Server is Running on : http://localhost:${PORT}`)
);
