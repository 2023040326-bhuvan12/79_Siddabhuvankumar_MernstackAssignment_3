const express = require("express");
const session = require("express-session");
const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Create Redis client
const redisClient = createClient({
    url: "redis://localhost:6379"
});

// Connect Redis
redisClient.connect()
    .then(() => {
        console.log("Connected to Redis");
    })
    .catch((err) => {
        console.log("Redis connection error:", err);
    });

// Session configuration
app.use(
    session({
        store: new RedisStore({
            client: redisClient
        }),
        secret: "my-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30
        }
    })
);

// Home route
app.get("/", (req, res) => {
    res.send("Express + Redis Session is working!");
});

// Login route
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    // Simple username and password
    if (username === "admin" && password === "12345") {

        // Create session
        req.session.user = username;

        res.send("Login successful!");

    } else {

        res.send("Invalid username or password");

    }
});

// Protected Route 1
app.get("/dashboard", (req, res) => {

    // Check if user is logged in
    if (!req.session.user) {
        return res.status(401).send("Please login first");
    }

    res.send(`
        <h1>Dashboard</h1>
        <p>Welcome ${req.session.user}</p>
        <p>You are logged in.</p>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});