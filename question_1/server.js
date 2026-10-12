const express = require("express");
const path = require("path");
const multer = require("multer");

const {
    body,
    validationResult
} = require("express-validator");

const app = express();

const PORT = 3000;

// EJS
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Form data
app.use(express.urlencoded({ extended: true }));


// ===============================
// MULTER CONFIGURATION
// ===============================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }

});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 2 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG and PNG images are allowed"));
        }
    }
});


// ===============================
// GET FORM
// ===============================

app.get("/", (req, res) => {

    res.render("form", {
        errors: [],
        old: {}
    });

});


// ===============================
// POST FORM
// ===============================

app.post(
    "/register",

    upload.fields([
        {
            name: "profilePic",
            maxCount: 1
        },
        {
            name: "otherPics",
            maxCount: 5
        }
    ]),

    [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must contain at least 6 characters"),

        body("confirmPassword")
            .custom((value, { req }) => {
                return value === req.body.password;
            })
            .withMessage("Passwords do not match"),

        body("email")
            .isEmail()
            .withMessage("Enter a valid email"),

        body("gender")
            .notEmpty()
            .withMessage("Please select gender"),

        body("hobbies")
            .custom((value) => {

                if (!value) {
                    throw new Error("Select at least one hobby");
                }

                return true;
            })
    ],

    (req, res) => {

        const errors = validationResult(req);

        const old = req.body;

        // Validation error
        if (!errors.isEmpty()) {

            return res.render("form", {
                errors: errors.array(),
                old: old
            });

        }

        // File validation
        if (!req.files || !req.files.profilePic) {

            return res.render("form", {
                errors: [
                    {
                        msg: "Profile picture is required"
                    }
                ],
                old: old
            });

        }

        // Get uploaded files

        const profilePic =
            req.files.profilePic[0];

        const otherPics =
            req.files.otherPics || [];


        // Send data to result page

        res.render("result", {

            username: req.body.username,

            email: req.body.email,

            gender: req.body.gender,

            hobbies: Array.isArray(req.body.hobbies)
                ? req.body.hobbies
                : [req.body.hobbies],

            profilePic: profilePic.filename,

            otherPics: otherPics

        });

    }
);


// ===============================
// DOWNLOAD ROUTE
// ===============================

app.get("/download/:filename", (req, res) => {

    const filePath = path.join(
        __dirname,
        "uploads",
        req.params.filename
    );

    res.download(filePath, (err) => {

        if (err) {
            console.log(err);
        }

    });

});


// ===============================
// START SERVER
// ===============================

app.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});