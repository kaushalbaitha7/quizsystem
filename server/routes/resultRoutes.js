const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");

const Result = require("../models/Result");

// ==============================
// Save Result
// ==============================
router.post("/submit", async (req, res) => {
  try {
    const result = new Result(req.body);

    await result.save();

    res.json({
      success: true,
      message: "Result Saved Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Unable to Save Result",
    });

  }
});

// ==============================
// Get All Results
// ==============================
router.get("/results", async (req, res) => {

  try {

    const results = await Result.find().sort({ _id: -1 });

    res.json(results);

  } catch (err) {

    res.status(500).json({
      success: false,
      message: "Unable to Fetch Results",
    });

  }

});

// ==============================
// Export Excel
// ==============================
router.get("/export", async (req, res) => {

  try {

    const results = await Result.find();

    const excelData = results.map((item) => ({

      Name: item.student.name,

      USN: item.student.usn,

      College: item.student.college,

      Branch: item.student.branch,

      Semester: item.student.semester,

      Score: item.score,

      Total: item.total,

      Percentage: item.percentage + "%",

      Submitted: item.submittedAt

    }));

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Assessment Report"
    );

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx"
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Python_Streamlit_Assessment_Report.xlsx"
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Excel Export Failed"
    });

  }

});

module.exports = router;