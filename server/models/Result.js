const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  student: {
    name: String,
    usn: String,
    college: String,
    branch: String,
    semester: String,
  },

  score: Number,
  total: Number,
  percentage: Number,

  answers: Object,

  submittedAt: String,
});

module.exports = mongoose.model("Result", ResultSchema);