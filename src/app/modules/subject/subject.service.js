// services/subject.service.ts

import { Class } from "../class/class.model.js";
import { Subject } from "./subject.model.js";

//* Create Subject
export const createSubjectsIntoDB = async (classId, subjects) => {
  // Check if class exists
  const classExists = await Class.findById(classId);
  if (!classExists) throw new Error("Invalid classId. Class does not exist.");

  // Check for duplicates inside request
  const seen = new Set();
  for (let subj of subjects) {
    const key = `${classId}-${subj.subjectName.toLowerCase()}`;
    if (seen.has(key))
      throw new Error(`Duplicate subject "${subj.subjectName}" in request`);
    seen.add(key);
  }

  // Check for duplicates in DB
  const subjectNames = subjects.map((s) => s.subjectName);
  const existing = await Subject.find({
    classId,
    subjectName: { $in: subjectNames },
  });
  if (existing.length > 0) {
    const existingNames = existing.map((s) => s.subjectName);
    throw new Error(
      `These subjects already exist: ${existingNames.join(", ")}`
    );
  }

  // Insert multiple subjects
  const subjectsToInsert = subjects.map((s) => ({
    classId,
    subjectName: s.subjectName,
  }));
  return await Subject.insertMany(subjectsToInsert);
};

//* Get All Subjects (only not deleted)
export const getSubjectsFromDB = async () => {
  return await Subject.find({ isDeleted: false }).populate("classId");
};

// Update Subject Name
export const updateSubjectIntoDB = async (id, subjectName) => {
  const subject = await Subject.findByIdAndUpdate(
    id,
    { subjectName },
    { new: true }
  );
  if (!subject) throw new Error("Subject not found");
  return subject;
};

// Soft Delete Subject
export const deleteSubjectFromDB = async (id) => {
  const subject = await Subject.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  if (!subject) throw new Error("Subject not found");
  return subject;
};
