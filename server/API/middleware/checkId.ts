import mongoose from "mongoose";

// middleware to check for a valid object id
const checkObjectId = (idToCheck: number) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ message: "Invalid ID" });
  next();
};

module.exports = checkObjectId;
