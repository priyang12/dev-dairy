const Auth = require("firebase-admin/auth");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");
  //check token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    const decoded = await Auth.getAuth().verifyIdToken(token);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ msg: "token has expired" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
