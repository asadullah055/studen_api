const mongoose = require("mongoose");
const workSchema = require("../model/WorksModel");
const Work = new mongoose.model("Work", workSchema);
// Create a work
exports.createWork = async (req, res) => {
  const newWork = new Work(req.body);
  try {
    const data = await newWork.save();
    res.status(200).json({ status: "work create success", data: data });
  } catch (error) {
    res.status(404).json({ error: "work create fail" });
  }
};

// Get all works
exports.getAllWorks = async (req, res) => {
  try {
    const work = await Work.find();
    res.status(200).json({ status: "success", data: work });
  } catch (error) {
    res.status(404).json({ error: "failed" });
  }
};

// Update a work
exports.updateWork = async (req, res) => {
  try {
    const work = await Work.updateOne({ _id: req.params.id }, req.body, {
      new: true,
    });

    res.status(200).json({ status: "success", data: work });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Failed to update work" });
  }
};

// Delete a work
exports.deleteWork = async (req, res) => {
  try {
    const result = await Work.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Delete successful", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
