import {
  createNoticeIntoDB,
  getAllNoticesFromDB,
  getNoticeByIdFromDB,
  softDeleteNoticeInDB,
  updateNoticeInDB,
} from "./notice.service.js";

// Create Notice (only teacher & admin)
export const createNotice = async (req, res) => {
  try {
    const notice = await createNoticeIntoDB(req.body);
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Notices
export const getNotices = async (req, res) => {
  try {
    const notices = await getAllNoticesFromDB();
    res.status(200).json({ success: true, data: notices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Notice
export const getNoticeById = async (req, res) => {
  try {
    const notice = await getNoticeByIdFromDB(req.params.id);
    if (!notice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Notice
export const updateNotice = async (req, res) => {
  try {
    const updatedNotice = await updateNoticeInDB(req.params.id, req.body);
    if (!updatedNotice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    res.status(200).json({ success: true, data: updatedNotice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Soft Delete Notice
export const deleteNotice = async (req, res) => {
  try {
    const deletedNotice = await softDeleteNoticeInDB(req.params.id);
    if (!deletedNotice) {
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
