const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    stdAdNo: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
    },
    dob: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      default: "student",
    },
    avatar: {
      type: String,
      default:
        "https://cdn4.iconfinder.com/data/icons/people-avatar-1-2/512/33-512.png",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", studentSchema);
