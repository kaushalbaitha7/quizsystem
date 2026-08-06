const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");

const Result = require("../models/Result");

// =====================================
// Save Result
// =====================================

router.post("/submit", async (req, res) => {

    try {

        const result = new Result(req.body);

        await result.save();

        res.json({
            success: true,
            message: "Result Saved Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable to Save Result"
        });

    }

});

// =====================================
// Get Results
// /api/results
// /api/results?test=test1
// /api/results?test=test2
// =====================================

router.get("/results", async (req, res) => {

    try {

        const { test } = req.query;

        let filter = {};

        if (test && test !== "all") {

            filter.testName = test;

        }

        const results = await Result
            .find(filter)
            .sort({ _id: -1 });

        res.json(results);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Unable to Fetch Results"
        });

    }

});

// =====================================
// Export Excel
// /api/export
// /api/export?test=test1
// /api/export?test=test2
// =====================================

router.get("/export", async (req, res) => {

    try {

        const { test } = req.query;

        let filter = {};

        if (test && test !== "all") {

            filter.testName = test;

        }

        const results = await Result.find(filter);

        const excelData = results.map((item) => ({

            Test:
                item.testName === "test2"
                    ? "Mock Test 2"
                    : "Mock Test 1",

            Name: item.student.name,

            USN: item.student.usn,

            College: item.student.college,

            Branch: item.student.branch,

            Semester: item.student.semester,

            Score: `${item.score}/${item.total}`,

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

        let fileName = "Assessment_Report.xlsx";

        if (test === "test1") {

            fileName = "Mock_Test_1_Report.xlsx";

        } else if (test === "test2") {

            fileName = "Mock_Test_2_Report.xlsx";

        }

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${fileName}`
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