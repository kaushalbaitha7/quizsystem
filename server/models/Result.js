const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({

    // =====================================
    // STUDENT DETAILS
    // =====================================

    student: {

        name: {
            type: String,
            required: true
        },

        usn: {
            type: String,
            required: true
        },

        college: {
            type: String,
            required: true
        },

        branch: {
            type: String,
            required: true
        },

        semester: {
            type: String,
            required: true
        }

    },


    // =====================================
    // TEST DETAILS
    // =====================================

    testName: {

        type: String,

        required: true,

        default: "test1"

    },

    testTitle: {

        type: String,

        default: "Mock Test 1"

    },


    // =====================================
    // RESULT DETAILS
    // =====================================

    score: {

        type: Number,

        required: true

    },

    total: {

        type: Number,

        required: true

    },

    percentage: {

        type: Number,

        required: true

    },


    // =====================================
    // ANSWERS
    // =====================================

    answers: {

        type: Object,

        default: {}

    },


    // =====================================
    // SUBMISSION TIME
    // =====================================

    submittedAt: {

        type: String,

        required: true

    }

}, {

    timestamps: true

});


module.exports = mongoose.model(
    "Result",
    ResultSchema
);