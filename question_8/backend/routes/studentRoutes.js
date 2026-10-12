const express = require("express");

const Student = require("../models/Student");

const router = express.Router();


// CREATE
router.post("/", async (req, res) => {

    try {

        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// READ
router.get("/", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// READ ONE
router.get("/:id", async (req, res) => {

    try {

        const student = await Student.findById(
            req.params.id
        );

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// UPDATE
router.put("/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// DELETE
router.delete("/:id", async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(
            req.params.id
        );

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;