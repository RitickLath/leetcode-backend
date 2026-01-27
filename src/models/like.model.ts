import mongoose, { Types } from "mongoose";
import type { ILike } from "types/model.types.js";

const likeSchema = new mongoose.Schema<ILike>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    problemId: {
      type: Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    status: {
      type: String,
      enum: {
        values: ["LIKE", "DISLIKE"],
        message: "Status must be LIKE or DISLIKE",
      },
      default: "LIKE",
      required: true,
    },
  },
  { timestamps: true },
);

// One vote per user per problem
likeSchema.index({ userId: 1, problemId: 1 }, { unique: true });

export const Like = mongoose.model<ILike>("Like", likeSchema);
