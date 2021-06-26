const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

//Get user modal
const User = require("../models/user");

const auth = require("../middleware/auth");

// Temp Store Image TO server using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/photos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("file");

// @router POST api/users/upload
// @desc Update Avatar
// @access private
router.post("/avatar", auth, async (req, res) => {
  const user_id = req.user.id;
  let user = await User.findOne({ _id: user_id });
  if (user) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      try {
        const oldavatar = user.avatar;
        user.avatar = `/Photos/${req.file.filename}`;
        user.save();
        fs.unlink(`server${oldavatar}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
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

module.exports = router;
