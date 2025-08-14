import { Class } from "./class.model";

export const createClassIntoDb = async (payload) => {
  // Check if class name already exists (case-insensitive)
  const existingClass = await Class.findOne({
    name: { $regex: `^${payload.name}$`, $options: "i" }, // case-insensitive match
  });

  if (existingClass) {
    throw new Error("Class name already exists");
  }

  // Create the class if name is unique
  return await Class.create(payload);
};

export const getAllClassesFormDB = async () => {
  return await Class.find();
};

export const getClassByIdFormDB = async (id) => {
  return await Class.findById(id);
};

export const updateClassIntoDb = async (id, payload) => {
  return await Class.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteClassFromDB = async (id) => {
  return await Class.findByIdAndDelete(id);
};
