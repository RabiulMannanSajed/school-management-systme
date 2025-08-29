import { Class } from "../class/class.model.js";
import { Section } from "../section/section.model.js";
import { Subject } from "../subject/subject.model.js";
import { Teacher } from "../teacher/teacher.model.js";
import { Diary } from "./diary.model.js";

export const createDiaryIntoDb = async (payload) => {
  const { classId, sectionId, subjectId, teacherId, note } = payload;

  // Check if class exists
  const classExists = await Class.findById(classId);
  if (!classExists) {
    throw new Error("Invalid classId: class not found");
  }

  // Check if section exists
  const sectionExists = await Section.findById(sectionId);
  if (!sectionExists) {
    throw new Error("Invalid sectionId: section not found");
  }

  // Check if subject exists
  const subjectExists = await Subject.findById(subjectId);
  if (!subjectExists) {
    throw new Error("Invalid subjectId: subject not found");
  }

  // Check if teacher exists
  const teacherExists = await Teacher.findById(teacherId);
  if (!teacherExists) {
    throw new Error("Invalid teacherId: teacher not found");
  }

  // Create diary entry
  const diary = new Diary({
    classId,
    sectionId,
    subjectId,
    teacherId,
    note,
  });

  return await diary.save();
};

// Get all diaries (excluding deleted ones)
export const getAllDiaries = async () => {
  return await Diary.find({ isDeleted: false }).populate(
    "classId sectionId subjectId teacherId"
  );
};

// Get single diary by ID
export const getDiaryById = async (id) => {
  return await Diary.findOne({ _id: id, isDeleted: false }).populate(
    "classId sectionId subjectId teacherId"
  );
};

// Update diary
export const updateDiary = async (id, updateData) => {
  return await Diary.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true }
  );
};

// Soft delete diary
export const softDeleteDiary = async (id) => {
  return await Diary.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
