import { Schema, model } from "mongoose";

const SectionSchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    sectionName: {
      type: String,
      required: true,
      trim: true,
    },

    roomNumber: {
      type: String,
      default: null, // optional
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Section = model("Section", SectionSchema);
