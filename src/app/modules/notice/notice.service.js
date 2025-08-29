import { Notice } from "./notice.model.js";

// Create Notice
export const createNoticeIntoDB = async (payload) => {
  const notice = new Notice(payload);
  return await notice.save();
};

// Get all notices (excluding soft deleted)
export const getAllNoticesFromDB = async () => {
  return await Notice.find({ isDeleted: false }).sort({ date: -1 });
};

// Get notice by ID
export const getNoticeByIdFromDB = async (id) => {
  return await Notice.findOne({ _id: id, isDeleted: false });
};

// Update Notice
export const updateNoticeInDB = async (id, payload) => {
  return await Notice.findByIdAndUpdate(id, payload, { new: true });
};

// Soft Delete Notice
export const softDeleteNoticeInDB = async (id) => {
  return await Notice.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
