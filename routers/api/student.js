const express = require('express');
const router = express.Router();
const data = {}
const studentcontroller = require('../../controllers/studentcontroller');
const verifyJwt = require('../../middlewares/verifyJwt');
data.student = require('../../model/student.json');

router.route('/')
    .get(studentcontroller.getAllStudents)
    .post(studentcontroller.createNewStudent)
router.route('/:id')
    .get(studentcontroller.getStudent)

module.exports = router;
