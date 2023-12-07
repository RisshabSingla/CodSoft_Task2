import { useState } from "react";
import NewQuestion from "./components/NewQuestion";
import { Question } from "./components/Question";

function BuildQuiz({ setOverlay }) {
  const [questions, setQuestions] = useState([]);
  const [addQuestion, setAddQuestion] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [quizDesc, setQuizDesc] = useState("");

  function handleQuizName(e) {
    setQuizName(e.target.value);
  }
  function handleQuizDesc(e) {
    setQuizDesc(e.target.value);
  }

  function handleAddQuestion() {
    setOverlay("");
  }
  return (
    <div className="h-full  overflow-auto">
      <div className="h-3/6">
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Let's make a new Quiz!</h1>
        </div>
        <div className=" pt-0 text-xl flex justify-evenly text-white">
          <div className="p-2">
            <div className="grid grid-cols-3 ">
              <div className="p-4">Quiz Name</div>
              <div className="p-2 col-span-2">
                <input
                  value={quizName}
                  onChange={handleQuizName}
                  className="rounded-xl p-2 text-black w-full "
                ></input>
              </div>
              <div className="p-4">Quiz Description</div>
              <div className="p-2 col-span-2">
                <input
                  value={quizDesc}
                  onChange={handleQuizDesc}
                  className="rounded-xl p-2 text-black w-full"
                ></input>
              </div>
              {addQuestion ? (
                <NewQuestion
                  questions={questions}
                  setQuestions={setQuestions}
                  setAddQuestion={setAddQuestion}
                />
              ) : (
                ""
              )}

              <button
                onClick={() => setAddQuestion(true)}
                className="col-span-3 w-full rounded-xl p-2 bg-slate-600"
              >
                Add a new Question
              </button>
              {questions.map((question, index) => (
                <Question
                  questions={questions}
                  setQuestions={setQuestions}
                  question={question.question}
                  choices={question.choices}
                  correct={question.correct}
                  key={index}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="p-2 flex justify-evenly">
          <button
            onClick={handleAddQuestion}
            className="hover:bg-slate-400 rounded-xl p-2 bg-slate-600"
          >
            Add Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuildQuiz;
