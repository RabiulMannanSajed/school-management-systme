import { Class } from "../class/class.model.js";
import { Section } from "./section.model.js";

// // CREATE
// export const createSectionsIntoDb = async (payload) => {
//   const { classId, sections } = payload;

//   // here find the classId
//   const classExists = await Class.findById(classId);
//   if (!classExists) throw new Error("Class not found");

//   // ! after add this not working
//   const exists = await Section.findOne({
//     classId: data.classId,
//     sectionName: data.sectionName,
//     roomNumber: data.roomNumber,
//   });

//   if (exists) {
//     throw new Error(
//       "Section with this name and room already exists for this class"
//     );
//   }

//   const dataToInsert = Array.isArray(sections) ? sections : [sections];

//   const sectionsWithClass = dataToInsert.map((sec) => ({
//     classId,
//     sectionName: sec.sectionName,
//     roomNumber: sec.roomNumber || null,
//   }));

//   return await Section.insertMany(sectionsWithClass);
// };

// export const createSectionsIntoDb = async (payload) => {
//   const { classId, sections } = payload;
//   console.log("payload", payload);
//   // 1️⃣ Check if the class exists
//   const classExists = await Class.findById(classId);
//   if (!classExists) throw new Error("Class not found");

//   // 2️⃣ Prepare data (support single or multiple section creation)
//   const dataToInsert = Array.isArray(sections) ? sections : [sections];

//   // 3️⃣ Loop through each section and check duplicates before insert
//   for (const sec of dataToInsert) {
//     const exists = await Section.findOne({
//       classId, // same class
//       $or: [
//         { sectionName: { $regex: `^${sec.sectionName}$`, $options: "i" } },
//         { roomNumber: sec.roomNumber },
//       ],
//     });

//     if (exists) {
//       throw new Error(
//         `Section with name "${sec.sectionName}" or room number "${sec.roomNumber}" already exists for this class`
//       );
//     }
//   }

//   // 4️⃣ Prepare final data for insertion
//   const sectionsWithClass = dataToInsert.map((sec) => ({
//     classId,
//     sectionName: sec.sectionName,
//     roomNumber: sec.roomNumber || null,
//   }));

//   // 5️⃣ Insert all valid sections
//   return await Section.insertMany(sectionsWithClass);
// };

export const createSectionsIntoDb = async (payload) => {
  const { classId, sectionName, roomNumber, sections } = payload;

  // 1️⃣ Check class exists
  const classExists = await Class.findById(classId);
  if (!classExists) throw new Error("Class not found");

  // 2️⃣ Normalize input
  const dataToInsert = sections
    ? Array.isArray(sections)
      ? sections
      : [sections]
    : [{ sectionName, roomNumber }];

  // 3️⃣ Check duplicates before insert
  for (const sec of dataToInsert) {
    const exists = await Section.findOne({
      classId,
      $or: [
        { sectionName: { $regex: `^${sec.sectionName}$`, $options: "i" } },
        { roomNumber: sec.roomNumber },
      ],
    });

    if (exists) {
      throw new Error(
        `Section "${sec.sectionName}" or room "${sec.roomNumber}" already exists for this class`
      );
    }
  }

  // 4️⃣ Insert
  const sectionsWithClass = dataToInsert.map((sec) => ({
    classId,
    sectionName: sec.sectionName,
    roomNumber: sec.roomNumber || null,
  }));

  return await Section.insertMany(sectionsWithClass);
};

// GET ALL
export const getAllSectionsFromDb = async (filters = {}) => {
  return await Section.find().populate("classId");
};

// GET BY ID
export const getSectionByIdFromDb = async (id) => {
  const section = await Section.findOne({ _id: id, isDeleted: false }).populate(
    "classId"
  );
  if (!section) throw new Error("Section not found");
  return section;
};

// UPDATE BY ID
export const updateSectionByIdInDb = async (id, updateData) => {
  const section = await Section.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updateData,
    { new: true }
  );
  if (!section) throw new Error("Section not found or deleted");
  return section;
};

// SOFT DELETE
export const softDeleteSectionByIdInDb = async (id) => {
  const section = await Section.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true }
  );
  if (!section) throw new Error("Section not found");
  return section;
};

// PERMANENT DELETE
export const deleteSectionByIdInDb = async (id) => {
  const section = await Section.findByIdAndDelete(id);
  if (!section) throw new Error("Section not found");
  return section;
};
