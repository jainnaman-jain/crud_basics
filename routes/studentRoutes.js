const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    createStudent,
    loginStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getProfile
} = require('../Controllers/studentController');

router.post('/', createStudent);
router.post('/login', loginStudent);
router.get('/profile', protect, getProfile);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);


module.exports = router;
