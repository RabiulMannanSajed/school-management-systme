import { model, Schema } from "mongoose";

const SubjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
});

export const Subject = model("Subject", SubjectSchema);
