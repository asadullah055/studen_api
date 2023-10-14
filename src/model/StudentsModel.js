const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  mobile: String,
  password: String,
  address: String,
  roll: String,
  class: String,
}, {versionKey: false});

module.exports = studentSchema;
