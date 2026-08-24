const express = require("express");
const router = express.Router();
const XLSX = require("xlsx");

const Result = require("../models/Result");

// =====================================
// TEST NAMES
// =====================================

const testNames = {

    test1: "Java Basics 1",

    test2: "Java Fundamentals 1",

    test3: "AI & Data Science",

    test4: "Python & Data Science",

    test5: "Statistics & Machine Learning",

    test6: "Machine Learning & AI",

    test7: "Full Stack Web Development",

    test8: "React & JavaScript",

    test9: "Web APIs & Databases",

    test10: "Generative AI & LLMs",

    test11: "RAG, Embeddings & AI Systems",

    test12: "Coding, Debugging & Aptitude"

};


// =====================================
// SAVE RESULT
// =====================================

router.post("/submit", async (req, res) => {

    try {

        const resultData = {

            ...req.body,

            testTitle:
                req.body.testTitle ||
                testNames[req.body.testName] ||
                "Mock Test"

        };

        const result = new Result(resultData);

        await result.save();

        res.json({

            success: true,

            message: "Result Saved Successfully",

            result

        });

    } catch (err) {

        console.log("Save Result Error:", err);

        res.status(500).json({

            success: false,

            message: "Unable to Save Result"

        });

    }

});


// =====================================
// GET RESULTS
//
// /api/results
// /api/results?test=all
// /api/results?test=test1
// ...
// /api/results?test=test12
// =====================================

router.get("/results", async (req, res) => {

    try {

        const { test } = req.query;

        let filter = {};

        if (
            test &&
            test !== "all"
        ) {

            filter.testName = test;

        }

        const results = await Result
            .find(filter)
            .sort({
                _id: -1
            });

        res.json(results);

    } catch (err) {

        console.log(
            "Fetch Results Error:",
            err
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to Fetch Results"

        });

    }

});


// =====================================
// EXPORT EXCEL
//
// /api/export
// /api/export?test=all
// /api/export?test=test1
// ...
// /api/export?test=test12
// =====================================

router.get("/export", async (req, res) => {

    try {

        const { test } = req.query;

        let filter = {};

        if (
            test &&
            test !== "all"
        ) {

            filter.testName = test;

        }

        const results =
            await Result.find(filter);


        // =================================
        // PREPARE EXCEL DATA
        // =================================

        const excelData = results.map(
            (item) => ({

                Test:
                    item.testTitle ||
                    testNames[item.testName] ||
                    "Mock Test",

                "Test ID":
                    item.testName || "",

                Name:
                    item.student?.name || "",

                USN:
                    item.student?.usn || "",

                College:
                    item.student?.college || "",

                Branch:
                    item.student?.branch || "",

                Semester:
                    item.student?.semester || "",

                Score:
                    `${item.score}/${item.total}`,

                Percentage:
                    `${item.percentage}%`,

                Submitted:
                    item.submittedAt || ""

            })
        );


        // =================================
        // CREATE WORKBOOK
        // =================================

        const workbook =
            XLSX.utils.book_new();

        const worksheet =
            XLSX.utils.json_to_sheet(
                excelData
            );


        // =================================
        // COLUMN WIDTHS
        // =================================

        worksheet["!cols"] = [

            { wch: 32 }, // Test

            { wch: 12 }, // Test ID

            { wch: 24 }, // Name

            { wch: 18 }, // USN

            { wch: 32 }, // College

            { wch: 24 }, // Branch

            { wch: 12 }, // Semester

            { wch: 12 }, // Score

            { wch: 14 }, // Percentage

            { wch: 25 }  // Submitted

        ];


        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Assessment Report"

        );


        // =================================
        // GENERATE EXCEL BUFFER
        // =================================

        const buffer = XLSX.write(

            workbook,

            {

                type: "buffer",

                bookType: "xlsx"

            }

        );


        // =================================
        // FILE NAME
        // =================================

        let fileName =
            "All_Assessment_Reports.xlsx";


        if (
            test &&
            test !== "all"
        ) {

            const cleanName =
                (
                    testNames[test] ||
                    test
                )
                    .replace(
                        /[^a-zA-Z0-9]+/g,
                        "_"
                    )
                    .replace(
                        /^_|_$/g,
                        ""
                    );


            fileName =
                `${cleanName}_Report.xlsx`;

        }


        // =================================
        // RESPONSE HEADERS
        // =================================

        res.setHeader(

            "Content-Disposition",

            `attachment; filename="${fileName}"`

        );


        res.setHeader(

            "Content-Type",

            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

        );


        res.send(buffer);

    } catch (err) {

        console.log(
            "Excel Export Error:",
            err
        );

        res.status(500).json({

            success: false,

            message:
                "Excel Export Failed"

        });

    }

});


module.exports = router;