import { User } from "../user/user.model.js";
import { Student } from "./student.model.js";

export const createStudentWithUser = async (studentData) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const newStudent = await Student.create([studentData], { session });

    const newUser = await User.create(
      [
        {
          name: studentData.name,
          email: studentData.email, // Ensure email is provided in studentData
          password: studentData.password, // Hash in real apps
          role: "Student",
        },
      ],
      { session }
    );

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return { student: newStudent[0], user: newUser[0] };
  } catch (error) {
    // ❌ Rollback if anything fails
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

/**
 * Get all students (excluding soft-deleted ones)
 */
export const getAllStudentsFromDB = async () => {
  return await Student.find({ isDeleted: false })
    .populate("classId")
    .populate("sectionId");
};

/**
 * Get a single student by ID
 */
export const getStudentByIdFromDB = async (id) => {
  return await Student.findById(id).populate("classId").populate("sectionId");
};

/**
 * Update student by ID
 */
export const updateStudentIntoDB = async (id, updateData) => {
  return await Student.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Soft delete student by ID
 */
export const deleteStudentFromDB = async (id) => {
  return await Student.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};

/**
 * Permanently delete student by ID
 */
export const hardDeleteStudentFromDB = async (id) => {
  return await Student.findByIdAndDelete(id);
};
