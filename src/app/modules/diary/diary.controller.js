// ✅ Create Diary

import {
  createDiaryIntoDb,
  getAllDiaries,
  getDiaryById,
  softDeleteDiary,
  updateDiary,
} from "./diary.service.js";

export const createDiaryController = async (req, res) => {
  try {
    const result = await createDiaryIntoDb(req.body);

    res.status(201).json({
      success: true,
      message: "Diary created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Get All Diaries
export const getAllDiariesController = async (req, res) => {
  try {
    const diaries = await getAllDiaries();
    res.status(200).json({ success: true, data: diaries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get Diary by ID
export const getDiaryByIdController = async (req, res) => {
  try {
    const diary = await getDiaryById(req.params.id);
    if (!diary) {
      return res
        .status(404)
        .json({ success: false, message: "Diary not found" });
    }
    res.status(200).json({ success: true, data: diary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update Diary
export const updateDiaryController = async (req, res) => {
  try {
    const updatedDiary = await updateDiary(req.params.id, req.body);
    if (!updatedDiary) {
      return res
        .status(404)
        .json({ success: false, message: "Diary not found" });
    }
    res.status(200).json({ success: true, data: updatedDiary });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ Soft Delete Diary
export const deleteDiaryController = async (req, res) => {
  try {
    const deletedDiary = await softDeleteDiary(req.params.id);
    if (!deletedDiary) {
      return res
        .status(404)
        .json({ success: false, message: "Diary not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Diary deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
