import mongoose, { Types } from "mongoose";
import type { IComment } from "types/model.types.js";

const commentSchema = new mongoose.Schema<IComment>(
  {
    threadId: {
      type: Types.ObjectId,
      ref: "Thread",
      required: [true, "Thread is required"],
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    parentCommentId: {
      type: Types.ObjectId,
      ref: "Comment",
      default: null, // null -> top-level comment
    },

    content: {
      type: String,
      required: [true, "Comment content is required"],
      maxlength: [10000, "Comment is too long"],
    },
  },
  { timestamps: true },
);

commentSchema.index({ threadId: 1 });
commentSchema.index({ threadId: 1, parentCommentId: 1 }); // with null queried frequently

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
