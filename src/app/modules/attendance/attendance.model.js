import { Schema, model } from "mongoose";

const AttendanceSchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    classTeacherId: {
      type: Schema.Types.ObjectId,
      ref: "User", // or "Teacher"
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    students: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["Present", "Absent", "Late", "Leave"], // flexible
          default: "Absent",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Attendance = model("Attendance", AttendanceSchema);
