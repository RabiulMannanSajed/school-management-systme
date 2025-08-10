import {
  createTeacherWithUser,
  deleteTeacherFromDB,
  getAllTeachersFromDB,
  getTeacherByIdFromDB,
  updateTeacherIntoDB,
} from "./teacher.service.js";

export const createTeacher = async (req, res) => {
  try {
    const { teacher, user } = await createTeacherWithUser(req.body);
    res.status(201).json({
      success: true,
      message: "Teacher and User created successfully",
      data: { teacher, user },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await getAllTeachersFromDB();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await getTeacherByIdFromDB(req.params.id);
    if (!teacher)
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    res.status(200).json({ success: true, data: teacher });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update teacher
export const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await updateTeacherIntoDB(req.params.id, req.body);
    if (!updatedTeacher)
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    res.status(200).json({ success: true, data: updatedTeacher });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await deleteTeacherFromDB(req.params.id);
    if (!deletedTeacher)
      return res
        .status(404)
        .json({ success: false, message: "Teacher not found" });
    res
      .status(200)
      .json({ success: true, message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
