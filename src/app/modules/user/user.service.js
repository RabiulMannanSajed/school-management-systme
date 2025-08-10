import { User } from "./user.model.js";

// Create user (with password hashing)
export const createUserIntoDB = async (userData) => {
  return await User.create(userData);
};

// Get all users
export const getAllUsersFromDB = async () => {
  return await User.find();
};

// Get user by ID
export const getUserByIdFromDB = async (id) => {
  return await User.findById(id);
};

// Update user
export const updateUserIntoDB = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete user
export const deleteUserFromBD = async (id) => {
  return await User.findByIdAndDelete(id);
};
