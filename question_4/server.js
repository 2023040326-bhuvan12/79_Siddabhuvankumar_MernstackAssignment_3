require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const Employee = require("./models/Employee");

const app = express();

const PORT = 3000;


// ========================================
// EJS
// ========================================

app.set("view engine", "ejs");


// ========================================
// MIDDLEWARE
// ========================================

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"));


// ========================================
// SESSION
// ========================================

app.use(
    session({

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        cookie: {
            maxAge: 1000 * 60 * 60
        }

    })
);


// ========================================
// MONGODB
// ========================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected");

    })

    .catch((err) => {

        console.log(
            "MongoDB connection error:",
            err
        );

    });


// ========================================
// ADMIN LOGIN PAGE
// ========================================

app.get("/", (req, res) => {

    res.render("login", {
        error: null
    });

});


// ========================================
// ADMIN LOGIN
// ========================================

app.post("/login", (req, res) => {

    const {
        username,
        password
    } = req.body;


    // Demo admin credentials

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        req.session.admin = {
            username: username
        };

        return res.redirect("/dashboard");

    }


    res.render("login", {

        error: "Invalid username or password"

    });

});


// ========================================
// AUTH MIDDLEWARE
// ========================================

function isAdmin(req, res, next) {

    if (req.session.admin) {

        next();

    } else {

        res.redirect("/");

    }

}


// ========================================
// DASHBOARD
// ========================================

app.get(
    "/dashboard",
    isAdmin,
    async (req, res) => {

        const count =
            await Employee.countDocuments();

        res.render("dashboard", {

            admin: req.session.admin,

            count: count

        });

    }
);


// ========================================
// EMPLOYEE LIST
// ========================================

app.get(
    "/employees",
    isAdmin,
    async (req, res) => {

        const employees =
            await Employee.find();

        res.render("employees", {

            employees: employees

        });

    }
);


// ========================================
// ADD EMPLOYEE PAGE
// ========================================

app.get(
    "/employees/add",
    isAdmin,
    (req, res) => {

        res.render("addEmployee");

    }
);


// ========================================
// GENERATE EMPLOYEE ID
// ========================================

async function generateEmpId() {

    const count =
        await Employee.countDocuments();

    return "EMP" +
        String(count + 1).padStart(4, "0");

}


// ========================================
// GENERATE PASSWORD
// ========================================

function generatePassword() {

    return Math.random()
        .toString(36)
        .slice(-8);

}


// ========================================
// ADD EMPLOYEE
// ========================================

app.post(
    "/employees/add",
    isAdmin,
    async (req, res) => {

        try {

            const {
                name,
                email,
                basicSalary
            } = req.body;


            // Generate employee ID

            const empid =
                await generateEmpId();


            // Generate password

            const plainPassword =
                generatePassword();


            // Encrypt password

            const hashedPassword =
                await bcrypt.hash(
                    plainPassword,
                    10
                );


            // Salary calculation

            const basic =
                Number(basicSalary);


            const hra =
                basic * 0.20;


            const da =
                basic * 0.10;


            const totalSalary =
                basic + hra + da;


            // Create employee

            const employee =
                new Employee({

                    empid: empid,

                    name: name,

                    email: email,

                    password: hashedPassword,

                    basicSalary: basic,

                    hra: hra,

                    da: da,

                    totalSalary: totalSalary

                });


            await employee.save();


            // ==================================
            // SEND EMAIL
            // ==================================

            const transporter =
                nodemailer.createTransport({

                    service: "gmail",

                    auth: {

                        user:
                            process.env.EMAIL_USER,

                        pass:
                            process.env.EMAIL_PASS

                    }

                });


            await transporter.sendMail({

                from:
                    process.env.EMAIL_USER,

                to: email,

                subject:
                    "Employee Account Created",

                text:

`Hello ${name},

Your employee account has been created.

Employee ID: ${empid}
Password: ${plainPassword}

Please use these credentials to login.

Thank you.`

            });


            res.redirect("/employees");


        } catch (error) {

            console.log(error);

            res.send(
                "Error while adding employee"
            );

        }

    }
);


// ========================================
// EDIT EMPLOYEE PAGE
// ========================================

app.get(
    "/employees/edit/:id",
    isAdmin,
    async (req, res) => {

        const employee =
            await Employee.findById(
                req.params.id
            );

        res.render("addEmployee", {

            employee: employee

        });

    }
);


// ========================================
// UPDATE EMPLOYEE
// ========================================

app.post(
    "/employees/edit/:id",
    isAdmin,
    async (req, res) => {

        const {
            name,
            email,
            basicSalary
        } = req.body;


        const basic =
            Number(basicSalary);

        const hra =
            basic * 0.20;

        const da =
            basic * 0.10;

        const totalSalary =
            basic + hra + da;


        await Employee.findByIdAndUpdate(

            req.params.id,

            {

                name: name,

                email: email,

                basicSalary: basic,

                hra: hra,

                da: da,

                totalSalary: totalSalary

            }

        );


        res.redirect("/employees");

    }
);


// ========================================
// DELETE EMPLOYEE
// ========================================

app.get(
    "/employees/delete/:id",
    isAdmin,
    async (req, res) => {

        await Employee.findByIdAndDelete(
            req.params.id
        );

        res.redirect("/employees");

    }
);


// ========================================
// LOGOUT
// ========================================

app.get("/logout", (req, res) => {

    req.session.destroy(() => {

        res.redirect("/");

    });

});


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});