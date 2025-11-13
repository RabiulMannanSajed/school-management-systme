import { model, Schema } from "mongoose";

const ClassSchema = new Schema({
  classname: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Class = model("Class", ClassSchema);
