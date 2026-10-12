const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const app = express();
app.use(express.urlencoded({ extended: true }));
// Login page.
app.get("/", (req, res) => {
    res.send(`
        <h1>Login</h1>

        <form method="POST" action="/login">
            <label>Username:</label>
            <input type="text" name="username" required>
            <br><br>

            <label>Password:</label>
            <input type="password" name="password" required>
            <br><br>
            <button type="submit">Login</button>
        </form>
    `);
});


// Login
app.post("/login", (req, res) => {

    const { username, password } = req.body;

    // Simple username and password
    if (username === "admin" && password === "1234") {

        req.session.user = username;

        res.send(`
            <h2>Login Successful!</h2>

            <a href="/profile">Go to Profile</a>
            <br><br>

            <a href="/dashboard">Go to Dashboard</a>
            <br><br>

            <a href="/logout">Logout</a>
        `);

    } else {

        res.send(`
            <h2>Invalid username or password</h2>
            <a href="/">Try Again</a>
        `);
    }
});


// Authentication middleware
function isAuthenticated(req, res, next) {

    if (req.session.user) {
        next();
    } else {
        res.status(401).send(`
            <h2>Access Denied</h2>
            <p>Please login first.</p>
            <a href="/">Login</a>
        `);
    }
}


// Protected Route 1
app.get("/profile", isAuthenticated, (req, res) => {

    res.send(`
        <h1>Profile</h1>

        <p>Welcome, ${req.session.user}!</p>

        <p>This is a protected profile page.</p>

        <a href="/dashboard">Dashboard</a>
        <br><br>

        <a href="/logout">Logout</a>
    `);
});


// dashboard route
app.get("/dashboard", isAuthenticated, (req, res) => {

    res.send(`
        <h1>Dashboard</h1>

        <p>Welcome, ${req.session.user}!</p>

        <p>This is a protected dashboard page.</p>

        <a href="/profile">Profile</a>
        <br><br>

        <a href="/logout">Logout</a>
    `);
});


// Logout
app.get("/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).send("Unable to logout");
        }

        res.send(`
            <h2>Logout Successful!</h2>
            <a href="/">Login Again</a>
        `);
    });
});


// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
