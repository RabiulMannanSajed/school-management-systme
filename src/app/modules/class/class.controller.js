import {
  createClassIntoDb,
  deleteClassFromDB,
  getAllClassesFormDB,
  getClassByIdFormDB,
  updateClassIntoDb,
} from "./class.service.js";

export const createClass = async (req, res) => {
  try {
    const newClass = await createClassIntoDb(req.body);
    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllClasses = async (req, res) => {
  try {
    const classes = await getAllClassesFormDB();
    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classData = await getClassByIdFormDB(req.params.id);
    if (!classData) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    res.status(200).json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const updatedClass = await updateClassIntoDb(req.params.id, req.body);
    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const deleted = await deleteClassFromDB(req.params.id);
    console.log(deleted);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
