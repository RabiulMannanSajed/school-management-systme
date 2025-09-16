import { model, Schema } from "mongoose";

const attendanceRecordSchema = new Schema(
  {
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      required: true,
    },
  },
  { _id: false } // prevent auto _id for each subdocument
);

const teacherAttendanceSchema = new Schema(
  {
    // use this id from the teacher not from the user
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    records: [attendanceRecordSchema], // ✅ all attendance in one array
  },
  { timestamps: true }
);

// Ensure one attendance per date
teacherAttendanceSchema.index(
  { teacherId: 1, "records.date": 1 },
  { unique: true, sparse: true }
);

export const TeacherAttendance = model(
  "TeacherAttendance",
  teacherAttendanceSchema
);
