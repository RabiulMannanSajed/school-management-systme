export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // already set by authMiddleware
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};
