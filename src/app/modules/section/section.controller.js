import {
  createSectionsIntoDb,
  deleteSectionByIdInDb,
  getAllSectionsFromDb,
  getSectionByIdFromDb,
  softDeleteSectionByIdInDb,
  updateSectionByIdInDb,
} from "./section.service";

// CREATE
export const createSections = async (req, res) => {
  try {
    const result = await createSectionsIntoDb(req.body);
    res
      .status(201)
      .json({ success: true, message: "Section(s) created", data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET ALL
export const getAllSections = async (req, res) => {
  try {
    const result = await getAllSectionsFromDb();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET BY ID
export const getSectionById = async (req, res) => {
  try {
    const result = await getSectionByIdFromDb(req.params.id);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// UPDATE BY ID
export const updateSectionById = async (req, res) => {
  try {
    const result = await updateSectionByIdInDb(req.params.id, req.body);
    res
      .status(200)
      .json({ success: true, message: "Section updated", data: result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// SOFT DELETE
export const softDeleteSectionById = async (req, res) => {
  try {
    const result = await softDeleteSectionByIdInDb(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Section soft deleted", data: result });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// PERMANENT DELETE
export const deleteSectionById = async (req, res) => {
  try {
    const result = await deleteSectionByIdInDb(req.params.id);
    res.status(200).json({
      success: true,
      message: "Section permanently deleted",
      data: result,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
