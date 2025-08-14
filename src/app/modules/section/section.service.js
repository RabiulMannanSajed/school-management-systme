import { Class } from "../class/class.model.js";
import { Section } from "./section.model.js";

// CREATE
export const createSectionsIntoDb = async (payload) => {
  const { classId, sections } = payload;

  const classExists = await Class.findById(classId);
  if (!classExists) throw new Error("Class not found");

  const dataToInsert = Array.isArray(sections) ? sections : [sections];

  const sectionsWithClass = dataToInsert.map((sec) => ({
    classId,
    sectionName: sec.sectionName,
    roomNumber: sec.roomNumber || null,
  }));

  return await Section.insertMany(sectionsWithClass);
};

// GET ALL
export const getAllSectionsFromDb = async (filters = {}) => {
  return await Section.find({ isDeleted: false, ...filters }).populate(
    "classId"
  );
};

// GET BY ID
export const getSectionByIdFromDb = async (id) => {
  const section = await Section.findOne({ _id: id, isDeleted: false }).populate(
    "classId"
  );
  if (!section) throw new Error("Section not found");
  return section;
};

// UPDATE BY ID
export const updateSectionByIdInDb = async (id, updateData) => {
  const section = await Section.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true }
  );
  if (!section) throw new Error("Section not found or deleted");
  return section;
};

// SOFT DELETE
export const softDeleteSectionByIdInDb = async (id) => {
  const section = await Section.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  if (!section) throw new Error("Section not found");
  return section;
};

// PERMANENT DELETE
export const deleteSectionByIdInDb = async (id) => {
  const section = await Section.findByIdAndDelete(id);
  if (!section) throw new Error("Section not found");
  return section;
};
