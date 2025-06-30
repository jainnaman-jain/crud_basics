const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

const createStudent = async (req, res) => {
    try {
        const { name, email, password, age, course } = req.body;
        const existing = await Student.findOne({ email });
        if (existing) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const student = new Student(req.body);
        const saved = await student.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ error: 'Email not found' });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const token = createToken(student._id);
        res.status(200).json({ student, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.json(students);
};

const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student)
            return res.status(404).json({ message: 'Not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStudent = async (req, res) => {
    try {
        const updated = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const student = await Student.findById(req.user.id).select("-password");
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: "Student profile", student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getProfile
};
