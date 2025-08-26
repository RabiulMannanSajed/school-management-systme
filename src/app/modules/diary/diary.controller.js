// // Create
// export const createDiary = async (req, res) => {
//   try {
//     const diary = await DiaryService.createDiary(req.body);
//     res.status(201).json({ success: true, data: diary });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Get all (with filters)
// export const getDiaries = async (req, res) => {
//   try {
//     const filter = {};
//     if (req.query.classId) filter.classId = req.query.classId;
//     if (req.query.sectionId) filter.sectionId = req.query.sectionId;
//     if (req.query.subjectId) filter.subjectId = req.query.subjectId;
//     if (req.query.date) filter.date = req.query.date;

//     const diaries = await DiaryService.getDiaries(filter);
//     res.status(200).json({ success: true, data: diaries });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get single
// export const getDiaryById = async (req, res) => {
//   try {
//     const diary = await DiaryService.getDiaryById(req.params.id);
//     if (!diary)
//       return res
//         .status(404)
//         .json({ success: false, message: "Diary not found" });
//     res.status(200).json({ success: true, data: diary });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update
// export const updateDiary = async (req, res) => {
//   try {
//     const diary = await DiaryService.updateDiary(req.params.id, req.body);
//     if (!diary)
//       return res
//         .status(404)
//         .json({ success: false, message: "Diary not found" });
//     res.status(200).json({ success: true, data: diary });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Delete
// export const deleteDiary = async (req, res) => {
//   try {
//     const diary = await DiaryService.deleteDiary(req.params.id);
//     if (!diary)
//       return res
//         .status(404)
//         .json({ success: false, message: "Diary not found" });
//     res
//       .status(200)
//       .json({ success: true, message: "Diary deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
