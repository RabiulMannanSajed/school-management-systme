import { Class } from "./class.model.js";

export const createClassIntoDb = async (payload) => {
  const existingClass = await Class.findOne({
    classname: { $regex: `^${payload.classname}$`, $options: "i" },
  });

  if (existingClass) {
    throw new Error("Class name already exists");
  }

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

// Soft delete implementation
export const deleteClassFromDB = async (id) => {
  return await Class.findOneAndUpdate(
    { _id: id },
    { $set: { isDeleted: true } },
    { new: true }
  );
};
