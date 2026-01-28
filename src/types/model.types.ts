import type { Types } from "mongoose";

// Problem Interface
export interface IProblem {
  id: string;
  title: string;
  description: string;

  difficulty: "EASY" | "MEDIUM" | "HARD";

  constraints: string[];
  hints: string[];
  tags: string[];

  timeLimitMs: Number;
  memoryLimitMb: Number;

  likeCount: number;
  dislikeCount: number;

  imageUrl?: string[];

  createdAt?: Date;
  updatedAt?: Date;
}

// User Interface
export interface IUser {
  firstName: string;
  lastName?: string;

  email: string;
  password: string;

  isVerified: boolean;
  verificationToken?: string | null;

  profile?: Types.ObjectId;
}

// Profile Interface
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

// Like Interface
export interface ILike {
  userId: Types.ObjectId;
  problemId: Types.ObjectId;

  status: "LIKE" | "DISLIKE";

  createdAt?: Date;
  updatedAt?: Date;
}

// Schema Interface
export interface ISubmission {
  userId: Types.ObjectId;
  problemId: Types.ObjectId;

  code: string;

  executionLanguage: "cpp" | "c" | "java" | "python" | "javascript";

  executionStatus:
    | "Pending"
    | "Running"
    | "Accepted"
    | "Wrong Answer"
    | "Time Limit Exceeded"
    | "Memory Limit Exceeded"
    | "Runtime Error"
    | "Compilation Error";

  executionTime: number;
  executionMemory: number;

  testCasesPassed: number;
  totalTestCases: number;

  errorMessage?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

// Example Test Interface
export interface ITestCase {
  problemId: Types.ObjectId;

  order: number;

  accessType: "PUBLIC" | "PRIVATE";

  inputText: string;
  outputText: string;

  createdAt?: Date;
  updatedAt?: Date;
}

// Thread Interface
export interface IThread {
  problemId: Types.ObjectId;
  userId: Types.ObjectId;

  title: string;
  content: string;

  commentCount: number;

  createdAt?: Date;
  updatedAt?: Date;
}

// Comment Interface
export interface IComment {
  threadId: Types.ObjectId;
  userId: Types.ObjectId;

  parentCommentId?: Types.ObjectId | null;

  content: string;

  createdAt?: Date;
  updatedAt?: Date;
}
