const express = require("express");
const router = express.Router();
const multer = require("multer");

//Get user modal
const User = require("../../models/user");

const upload = multer({ storage: storage }).single("file");

// Temp Store Image TO server using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/photos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// @router POST api/users/upload
// @desc Update Avatar
// @access private
router.post("/avatar", auth, async (req, res) => {
  const user_id = req.user.id;
  let user = await User.findOne({ _id: user_id });
  if (user) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      try {
        user.avatar = req.file.path;
        user.save();
        return res.status(200).send({ msg: "image has Been Uploaded" });
      } catch (err) {
        console.log(err);
        return res.status(404).json({ msg: "Error While sending to Database" });
      }
    });
  } else {
    return res.status(404).json({ msg: "No User" });
  }
});
