export const autogenaratedId = async () => {
  const session = new Date();
  // Year (last 2 digits)
  const year = now.getFullYear().toString().slice(-2);

  // Month (2 digits)
  const month = (now.getMonth() + 1).toString().padStart(2, "0");

  // Prefix e.g. "2508" (August 2025)
  const prefix = `${year}${month}`;

  // Find last student with this prefix
  const lastStudent = await Student.findOne(
    { UserID: { $regex: `^${prefix}` } },
    { UserID: 1 }
  )
    .sort({ createdAt: -1 })
    .lean();

  let nextNumber = 1;

  if (lastStudent) {
    const lastId = lastStudent.UserID;
    const lastSeq = parseInt(lastId.slice(-4), 10); // last 4 digits
    nextNumber = lastSeq + 1;
  }

  // Final UserID = prefix + sequence number (4 digits)
  const newUserId = `${prefix}${nextNumber.toString().padStart(4, "0")}`;

  return newUserId;
};
