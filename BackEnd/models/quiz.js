const mongoose = require("mongoose");
const Joi = require("joi");

const quizSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: {
    type: [
      {
        question: { type: String, required: true },
        choices: { type: [String], required: true },
        correct: { type: String, required: true },
      },
    ],
    required: true,
  },
});

const validate = (quiz) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(500).required(),
    questions: Joi.array().required(),
  });
  return schema.validate(quiz);
};

const Quiz = mongoose.model("quiz", quizSchema);

module.exports = { Quiz, validate };
