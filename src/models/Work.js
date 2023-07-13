import mongoose from "mongoose";

const { Schema } = mongoose;
const workSchema = new Schema(
  {
    title: {
      type: String,
    },
    jobduty: {
      type: String,
    },
    yearStarted: {
      type: Date,
    },
    yearEnded: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.Work || mongoose.model("Work", workSchema);

export default User;
