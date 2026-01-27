import mongoose, { Types } from "mongoose";
import type { ISubmission } from "types/model.types.js";

const submissionSchema = new mongoose.Schema<ISubmission>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    problemId: {
      type: Types.ObjectId,
      ref: "Problem",
      required: [true, "Problem is required"],
    },

    code: {
      type: String,
      required: [true, "Code is required"],
      minlength: [1, "Code cannot be empty"],
    },

    executionLanguage: {
      type: String,
      required: [true, "Language is required"],
      enum: ["cpp", "c", "java", "python", "javascript"], // extend later
    },

    executionStatus: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Running",
        "Accepted",
        "Wrong Answer",
        "Time Limit Exceeded",
        "Memory Limit Exceeded",
        "Runtime Error",
        "Compilation Error",
      ],
      default: "Pending",
    },

    executionTime: {
      type: Number, // in milliseconds
      default: 0,
      min: [0, "Execution time cannot be negative"],
    },

    executionMemory: {
      type: Number, // in MB
      default: 0,
      min: [0, "Execution memory cannot be negative"],
    },

    testCasesPassed: {
      type: Number,
      default: 0,
      min: [0, "Passed testcases cannot be negative"],
    },

    totalTestCases: {
      type: Number,
      default: 0,
      min: [0, "Total testcases cannot be negative"],
    },

    errorMessage: {
      type: String,
      maxlength: [10000, "Error message too long"],
    },
  },
  { timestamps: true },
);

export const Submission = mongoose.model<ISubmission>(
  "Submission",
  submissionSchema,
);
