import {
  createStudentWithUser,
  deleteStudentFromDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  updateStudentIntoDB,
} from "./student.service.js";

export const createStudent = async (req, res) => {
  try {
    const { teacher, user } = await createStudentWithUser(req.body);
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
export const getAllStudents = async (req, res) => {
  try {
    const teachers = await getAllStudentsFromDB();
    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get teacher by ID
export const getStudentById = async (req, res) => {
  try {
    const teacher = await getStudentByIdFromDB(req.params.id);
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
export const updateStudent = async (req, res) => {
  try {
    const updatedTeacher = await updateStudentIntoDB(req.params.id, req.body);
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
export const deleteStudent = async (req, res) => {
  try {
    const deletedTeacher = await deleteStudentFromDB(req.params.id);
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
