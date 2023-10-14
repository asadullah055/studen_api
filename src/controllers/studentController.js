const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const studentSchema = require("../model/StudentsModel");
const Student = new mongoose.model("Student", studentSchema);

exports.createStudent = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newStudent = new Student({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobile: req.body.mobile,
    password: hashedPassword,
    address: req.body.address,
    roll: req.body.roll,
    class: req.body.class,
  });
  try {
    const data = await newStudent.save();
    res.status(200).json({ status: "student create success", data: data });
  } catch (error) {
    res.status(400).json({ error: "failed" });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ status: "success", data: students });
  } catch (error) {
    res.status(400).json({ error: "failed" });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    res.status(200).json({ status: "success", data: student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to update student" });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const data = await Student.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "delete success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "can not filed student" });
  }
};

exports.login =  async (req, res) => {
  try {
    const student = await Student.find({ email: req.body.email });
    
    if (student && student.length > 0) {
      
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        student[0].password
      );
      
      if (isValidPassword) {
        console.log(isValidPassword);
        const token = jwt.sign(
          {
            email: req.body.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
          console.log(token);
        res.status(200).json({
          access_token: token,
          message: "Login successful!",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!0",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!1",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: "Authentication failed!3",
    });
  }
};