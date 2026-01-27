import mongoose, { type HydratedDocument } from "mongoose";
import type { IProblem } from "types/model.types.js";

const problemSchema = new mongoose.Schema<IProblem>(
  {
    id: {
      type: String,
      required: [true, "Problem id is required"],
      trim: true,
      minlength: [1, "Problem id cannot be empty"],
      maxlength: [100, "Problem id must be at most 100 characters long"],
    },

    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [300, "Title must be at most 300 characters long"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },

    difficulty: {
      type: String,
      enum: {
        values: ["EASY", "MEDIUM", "HARD"],
        message: "Difficulty must be EASY, MEDIUM, or HARD",
      },
      default: "EASY",
      required: true,
    },

    constraints: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= 5;
        },
        message: "Too many constraints (max 5)",
      },
    },

    timeLimitMs: {
      type: Number,
      required: true,
      default: 1000, // 1 second
      min: [100, "Time limit too low"],
      max: [10000, "Time limit too high"],
    },

    memoryLimitMb: {
      type: Number,
      required: true,
      default: 256, // 256 MB
      min: [16, "Memory limit too low"],
      max: [4096, "Memory limit too high"],
    },

    hints: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= 5;
        },
        message: "Too many hints (max 5)",
      },
    },

    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= 5;
        },
        message: "Too many tags (max 5)",
      },
    },

    likeCount: {
      type: Number,
      default: 0,
      min: [0, "likeCount cannot be negative"],
    },

    dislikeCount: {
      type: Number,
      default: 0,
      min: [0, "dislikeCount cannot be negative"],
    },

    imageUrl: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr: string[]) {
          return arr.length <= 5;
        },
        message: "Too many images (max 5)",
      },
    },
  },
  { timestamps: true },
);

problemSchema.index({ id: 1 }, { unique: true });

problemSchema.index({ title: "text" });

problemSchema.index({ difficulty: 1 });

problemSchema.index({ tags: 1 });

export const Problem = mongoose.model<IProblem>("Problem", problemSchema);
