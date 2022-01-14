const asyncHandler = require("express-async-handler");
const admin = require("firebase-admin");
const { validationResult } = require("express-validator");

// @route   GET api/Users/AllUsers
// @desc    Fetch All Userss
// @access  Private
const GetAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await db.getAllUsers();
    if (users.length > 0) throw new Error("No users were found");
    res.json(users);
  } catch (error) {
    res.status(500).send("server Error");
  }
});

// @route   GET api/Users/me
// @desc    Fetch User
// @access  Private
const GetUser = asyncHandler(async (req, res) => {
  try {
    const users = await admin.auth().getUser(req.userId);
    if (users.length > 0) throw new Error("No users were found");
    res.json(users);
  } catch (error) {
    res.status(500).send("server Error");
  }
});

// @router POST api/Users/register
// @desc Register User
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  const { username, email, password } = req.body;
  try {
    //create user
    await admin.auth().createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: username,
      disabled: false,
    });
    res.json({ message: "User Created" });
  } catch (error) {
    console.error();
    res.status(400).send("Server Error " + error.message);
  }
});

// @router POST api/users/login
// @desc Login User
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    //Check if user exists
    let user = await admin.auth().getUserByProviderUid(password);
    if (!user) throw new Error("User not found");

    // //Check if password is correct
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) throw new Error("Password is incorrect");

    // //Create and assign token
    // const token = await admin.auth().createCustomToken(user.uid);
    res.json({ user });
  } catch (error) {
    res.status(400).send("Server Error " + error.message);
  }
});

// @router PUT api/users/update
// @desc Update User Info
// @access private
const UpdateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    //Check if user exists
    let user = await admin.auth().getUserByProviderUid(email);
    if (!user) throw new Error("User not found");

    // //Check if password is correct
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) throw new Error("Password is incorrect");

    // //Create and assign token
    // const token = await admin.auth().createCustomToken(user.uid);
    res.json({ user });
  } catch (error) {
    res.status(400).send("Server Error " + error.message);
  }
});

module.exports = {
  registerUser,
  loginUser,
  GetAllUsers,
  GetUser,
};
