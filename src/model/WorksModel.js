const mongoose = require("mongoose");

const workSchema = new mongoose.Schema({
  title: String,
  classNote: String,
  description: String,
  status: String,
  email: String,
}, {versionKey:false});

module.exports = workSchema;
