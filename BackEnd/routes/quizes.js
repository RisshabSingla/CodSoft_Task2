const router = require("express").Router();
const { User } = require("../models/user");
const { Quiz, validate } = require("../models/quiz");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");

// Create quiz
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ message: error.details[0].message, error: "Hello" });

  const quiz = await Quiz(req.body).save();
  const user = await User.findById(req.user._id);
  user.createdQuizes.push(quiz);
  await user.save();
  return res
    .status(201)
    .send({ data: quiz, message: "Quiz created successfully" });
});

// Get all quizes
router.get("/", async (req, res) => {
  const quizes = await Quiz.find();
  res.status(200).send({ data: quizes, message: "all" });
});

// Get quiz by id
router.get("/:id", [validateObjectId, auth], async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  const user = await User.findById(req.user._id);
  const index = user.givenQuizes.filter(
    (q) => q._id.toString() === quiz._id.toString()
  );

  if (index.length === 0) {
    user.givenQuizes.push(quiz);
  }

  await user.save();
  return res.status(200).send({ data: quiz });
});

module.exports = router;
