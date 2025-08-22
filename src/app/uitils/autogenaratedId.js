import { User } from "../modules/user/user.model.js"; // adjust path

export const autogenaratedId = async () => {
  const now = new Date();

  // Year (last 2 digits)
  const year = now.getFullYear().toString().slice(-2);

  // Month (2 digits)
  const month = (now.getMonth() + 1).toString().padStart(2, "0");

  // Prefix e.g. "2508" (August 2025)
  const prefix = `${year}${month}`;

  // 🔍 Check if any user exists at all
  const totalUsers = await User.countDocuments();

  // If first ever user
  if (totalUsers === 0) {
    return `${prefix}0001`; // e.g. 25080001
  }

  // Otherwise, find last user with this prefix
  const lastUser = await User.findOne(
    { userId: { $regex: `^${prefix}` } },
    { userId: 1 }
  )
    .sort({ createdAt: -1 })
    .lean();

  let nextNumber = 1;

  if (lastUser) {
    const lastId = lastUser.userId;
    const lastSeq = parseInt(lastId.slice(-4), 10); // last 4 digits
    nextNumber = lastSeq + 1;
  }

  // Final userId = prefix + sequence number (4 digits)
  return `${prefix}${nextNumber.toString().padStart(4, "0")}`;
};
