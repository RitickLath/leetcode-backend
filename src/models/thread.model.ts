import mongoose, { Types } from "mongoose";
import type { IThread } from "types/model.types.js";

const threadSchema = new mongoose.Schema<IThread>(
  {
    problemId: {
      type: Types.ObjectId,
      ref: "Problem",
      required: [true, "Problem is required"],
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    title: {
      type: String,
      required: [true, "Thread title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },

    content: {
      type: String,
      required: [true, "Thread content is required"],
      maxlength: [20000, "Content is too long"],
    },

    commentCount: {
      type: Number,
      default: 0,
      min: [0, "Comment count cannot be negative"],
    },
  },
  { timestamps: true },
);

threadSchema.index({ problemId: 1 });

export const Thread = mongoose.model<IThread>("Thread", threadSchema);
