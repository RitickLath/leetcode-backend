import mongoose from "mongoose";
import type { ITestCase } from "types/model.types.js";

const testCaseSchema = new mongoose.Schema<ITestCase>(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: [true, "Problem is required"],
    },

    order: {
      type: Number,
      required: true,
      min: [1, "Order must be >= 1"],
    },

    accessType: {
      type: String,
      enum: {
        values: ["PUBLIC", "PRIVATE"],
        message: "Access type must be PUBLIC or PRIVATE",
      },
      required: [true, "Access type is required"],
    },

    inputText: {
      type: String,
      required: [true, "Input is required"],
      maxlength: [20000, "Input is too long"],
    },

    outputText: {
      type: String,
      required: [true, "Output is required"],
      maxlength: [20000, "Output is too long"],
    },
  },
  { timestamps: true },
);

testCaseSchema.index({ problemId: 1, order: 1 });
testCaseSchema.index({ problemId: 1, accessType: 1 });

export const TestCase = mongoose.model<ITestCase>("TestCase", testCaseSchema);
