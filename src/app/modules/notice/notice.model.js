import { Schema } from "mongoose";

const NoticeSchema = new Schema({
  notice: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  isDeleted: {
    type: Boolean,
    default: false,
  },

  noticeFor: {
    type: String,
    enum: ["All", "Students", "Teachers", "Parents"],
    default: "All",
  },
});

export const Notice = model("Notice", NoticeSchema);
