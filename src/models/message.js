import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["mateo", "andrea"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
