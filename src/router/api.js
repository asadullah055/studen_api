const express = require("express");
const studentController = require("../controllers/studentController");
const workController = require("../controllers/workController");
const isLogin = require("../middleware/AuthVerifyMiddleware");
const router = express.Router();

// student controller
router.post("/registration", studentController.createStudent);
router.post("/login", studentController.login);
router.get("/getall", studentController.getAllStudents);
router.put("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

// works controller
router.post("/create", isLogin, workController.createWork);
router.get("/getallwork", isLogin, workController.getAllWorks);
router.put("/updatework/:id", isLogin, workController.updateWork);
router.delete("/deletework/:id", isLogin, workController.deleteWork);

module.exports = router;
