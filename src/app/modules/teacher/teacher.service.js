import { startSession } from "mongoose";
import { Teacher } from "./teacher.model.js";
import { User } from "../user/user.model.js";
import { autogenaratedId } from "../../uitils/autogenaratedId.js";

export const createTeacherWithUser = async (teacherData) => {
  const session = await startSession();
  session.startTransaction();

  try {
    // 1️⃣ Create Teacher
    const userId = autogenaratedId();

    const newTeacher = await Teacher.create(
      [
        {
          ...teacherData,
          userId, // set unique ID
        },
      ],
      { session }
    );

    //2️⃣ Create User account
    // const hashedPassword = await bcrypt.hash(teacherData.password, 10);

    const newUser = await User.create(
      [
        {
          name: `${teacherData.firstName} ${teacherData.lastName}`,
          email: teacherData.email,
          password: teacherData.password, // In a real app, hash this password
          role: "Teacher",
          userId,
        },
      ],
      { session }
    );

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    return { teacher: newTeacher[0], user: newUser[0] };
  } catch (error) {
    // ❌ Rollback if anything fails
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Get all teachers
export const getAllTeachersFromDB = async () => {
  return await Teacher.find();
};

// Get teacher by ID
export const getTeacherByIdFromDB = async (id) => {
  return await Teacher.findById(id);
};

// Update teacher by ID
export const updateTeacherIntoDB = async (id, updateData) => {
  return await Teacher.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete teacher by ID
export const deleteTeacherFromDB = async (id) => {
  return await Teacher.findByIdAndDelete(id);
};
