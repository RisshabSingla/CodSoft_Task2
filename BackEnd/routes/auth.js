const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

// Log In
router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ message: "Invalid email or password!" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid email or password!" });

  const token = user.generateAuthToken();
  const user_id = user._id;
  res.status(200).send({
    data: token,
    id: user_id,
    message: "Signing in please wait...",
  });
});

module.exports = router;
