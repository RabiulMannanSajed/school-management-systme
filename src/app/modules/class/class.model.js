import { model, Schema } from "mongoose";

const ClassSchema = new Schema({
  classname: {
    type: String,
    required: true,
  },
});

export const Class = model("Class", ClassSchema);
