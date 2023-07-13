import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://edel:edel@cluster0.ylja2rz.mongodb.net/profileform"
    );
    console.log("connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }
};

export default connectDb;
