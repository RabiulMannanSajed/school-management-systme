// controllers/subject.controller.ts

import {
  createSubjectsIntoDB,
  deleteSubjectFromDB,
  getSubjectsFromDB,
  updateSubjectIntoDB,
} from "./subject.service.js";

export const createSubject = async (req, res) => {
  try {
    const { classId, subjects } = req.body; // subjects is an array
    const result = await createSubjectsIntoDB(classId, subjects);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await getSubjectsFromDB();
    res.json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectName } = req.body;
    const subject = await updateSubjectIntoDB(id, subjectName);
    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await deleteSubjectFromDB(id);
    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
