import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    images: {
      type: [String],
    },
    aboutMe: {
      type: String,
    },
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      dribble: String,
      youtube: String,
      tiktok: String,
    },
    website: {
      type: String,
    },
    skills: [String],

    workHistory: [
      {
        workTitle: {
          type: String,
        },
        jobDuty: {
          type: String,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
      },
    ],
  },
  {
    timeStamps: true,
  }
);

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema);

export default Profile;
