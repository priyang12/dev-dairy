const express = require("express");
const router = express.Router();
const config = require("../../node_modules/config");
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");

//Get user modal
const User = require("../../models/user");

//Get profile modal
const Profile = require("../../models/Profile");

// @router GET api/profile
// @desc Get user profile
// @access private
router.get("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user } = req;
  let profile = await Profile.findOne({ user: user.id });
  if (!profile) {
    return res
      .status(400)
      .json({ noProfile: "There is no profile of this User" });
  }
  return res.json(profile);
});

// @router GET api/profile/handle
// @desc Get user profile
// @access private

router.get("/user/:handle", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      handle: req.params.handle,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res
        .status(400)
        .json({ noProfile: "There is no User of this Handle" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("User Handle server Error");
  }
});

// @router GET api/profile/:user_id
// @desc Get user profile
// @access private

router.get("/user/id/:user_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ noProfile: "There is no ID of this User" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("User ID server Error");
  }
});
// @router GET api/profile/all
// @desc Get all user
// @access public

router.get("/all", async (req, res) => {
  try {
    let profile = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ noProfile: "There is no ID Profiles" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Profile server Error");
  }
});

// @router POST api/profile/
// @desc Post profile
// @access public
router.post(
  "/",
  [
    body("handle", "Handle is requied")
      .not()
      .isEmpty()
      .isLength({ min: 2, max: 5 }),
    body("statue", "status is requied").not().isEmpty(),
    body("skills", "skills is requied").not().isEmpty(),
    body("facebook", "Not valid URL").isURL(),
    body("youtube", "Not valid URL").isURL(),
    body("twitter", "Not valid URL").isURL(),
    body("linkedin", "Not valid URL").isURL(),
  ],
  auth,
  async (req, res) => {
    const profileFields = {};
    const user_id = req.user.id;
    profileFields.user = user_id;
    const {
      handle,
      company,
      location,
      website,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    let isUser = await Profile.findOne({ user: user_id });
    if (!isUser) {
      let ishandle = await Profile.findOne({ handle });
      if (ishandle)
        return res.status(400).json({ msg: "Handle already exists" });
      profileFields.handle = handle;
    }

    profileFields.company = company;
    profileFields.website = website;
    profileFields.location = location;
    profileFields.bio = bio;
    profileFields.status = status;
    profileFields.githubusername = githubusername;

    // Skills - Spilt into array
    if (typeof skills !== "undefined") {
      profileFields.skills = skills.split(",");
    }

    // Social
    profileFields.social = {};
    profileFields.social.youtube = youtube;
    profileFields.social.twitter = twitter;
    profileFields.social.facebook = facebook;
    profileFields.social.linkedin = linkedin;

    try {
      if (isUser) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: user_id },
          { $set: profileFields },
          { new: true }
        ).populate("user", ["name", "avatar"]);
        res.json(profile);
      } else {
        // Create
        profile = await new Profile(profileFields);
        profile.save();
        // console.log(profile);
        res.json(profile);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send("profile server Error");
    }
  }
);

// @router POST api/profile/experience
// @desc Post profile experience
// @access public
router.post(
  "/experience",
  [
    body("title", "title is requied").not().isEmpty(),
    body("company", "company is requied").not().isEmpty(),
    body("descrition", "company is requied").not().isEmpty(),
    body("from", "from is requied").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      const newexp = {
        title: req.body.jobTitle,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        descrition: req.body.descrition,
      };
      profile.experience.unshift(newexp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("profile server Error");
    }
  }
);
// @router POST api/profile/education
// @desc Post profile education
// @access public
router.post(
  "/education",
  [
    body("school", "school is requied").not().isEmpty(),
    body("degree", "degree is requied").not().isEmpty(),
    body("from", "from is requied").not().isEmpty(),
    body("fieldOfStudy", "fieldOfStudy is requied").not().isEmpty(),
  ],
  auth,
  async (req, res) => {
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      const newedu = {
        school: req.body.school,
        degree: req.body.degree,
        from: req.body.from,
        to: req.body.to,

        fieldOfStudy: req.body.fieldofstudy,
        current: req.body.current,
      };
      profile.education.unshift(newedu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(400).send("profile server Error");
    }
  }
);

// @router DELETE api/profile/experience
// @desc delete profile experience
// @access private
router.delete("/experience/:ex_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.ex_id);

    //slice out the array
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("profile server Error");
  }
});

// @router DELETE api/profile/education
// @desc delete profile education
// @access private
router.delete("/education/:ed_id", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.ed_id);

    //slice out the array
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("profile server Error");
  }
});

// @router DELETE api/profile
// @desc delete profile
// @access private
router.delete("/", auth, async (req, res) => {
  try {
    let profile = await Profile.findOneAndRemove({ user: req.user.id });

    if (profile) {
      await User.findOneAndRemove({ _id: req.user._id });
      return res.json({ success: true });
    }
    res.json({ error: true });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Profile delete server Error");
  }
});

module.exports = router;
