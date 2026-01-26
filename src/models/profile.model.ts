import mongoose, { Schema, Types } from "mongoose";

export interface IProfile {
  userId: Types.ObjectId;

  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  githubUrl?: string;

  maxStreak: number;
  currentStreak: number;
  totalSolved: number;
  totalAttempts: number;

  likeCount: number;
  saveCount: number;
}

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Profile must be associated with a user"],
      unique: true,
      index: true,
    },

    avatar: {
      type: String,
      default: "",
      trim: true,
      maxlength: [300, "Avatar URL must be at most 300 characters long"],
    },

    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Bio must be at most 500 characters long"],
    },

    location: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Location must be at most 100 characters long"],
    },

    website: {
      type: String,
      default: "",
      trim: true,
      maxlength: [200, "Website URL must be at most 200 characters long"],
    },

    githubUrl: {
      type: String,
      default: "",
      trim: true,
      maxlength: [200, "GitHub URL must be at most 200 characters long"],
    },

    maxStreak: {
      type: Number,
      default: 0,
      min: [0, "Max streak cannot be negative"],
    },

    currentStreak: {
      type: Number,
      default: 0,
      min: [0, "Current streak cannot be negative"],
    },

    totalSolved: {
      type: Number,
      default: 0,
      min: [0, "Total solved cannot be negative"],
    },

    totalAttempts: {
      type: Number,
      default: 0,
      min: [0, "Total attempts cannot be negative"],
    },

    likeCount: {
      type: Number,
      default: 0,
      min: [0, "Like count cannot be negative"],
    },

    saveCount: {
      type: Number,
      default: 0,
      min: [0, "Save count cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

// Frequently used while profile fetching
profileSchema.index({ userId: 1 }, { unique: true });

profileSchema.index({ totalSolved: -1, maxStreak: -1, currentStreak: -1 });

// Leaderboards for sorting
profileSchema.index({ totalSolved: -1 }); // Top solvers
profileSchema.index({ maxStreak: -1 }); // Longest ever streak
profileSchema.index({ currentStreak: -1 }); // Current active streak

export const Profile = mongoose.model<IProfile>("Profile", profileSchema);
