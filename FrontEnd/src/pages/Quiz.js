import { useState } from "react";
import NavBar from "../components/NavBar";

const questions = [
  {
    question: "Hello ",
    choices: ["A", "B", "C", "D"],
    correct: "B",
  },
  {
    question: "Hello 2",
    choices: ["AB", "BC", "CD", "DE"],
    correct: "BC",
  },
  {
    question: "Hello 3",
    choices: ["A", "B", "C", "D"],
    correct: "B",
  },
  {
    question: "Hello 4",
    choices: ["A", "B", "C", "D"],
    correct: "B",
  },
];

function Option({ choice, index, handleOptionClick, selectedOption }) {
  return (
    <div className="w-full">
      <button
        onClick={() => handleOptionClick(index)}
        className={`text-left m-2 w-full p-3 ${
          index === selectedOption ? "bg-slate-700" : "bg-slate-500"
        } rounded-xl`}
      >
        <span className="font-bold">{index + 1} </span> : {choice}
      </button>
    </div>
  );
}

function Question({ question, choices, handleOptionClick, selectedOption }) {
  return (
    <div>
      <div className="m-2 p-3 w-full bg-slate-500 rounded-xl ">
        <span className="font-bold	">Question: </span>
        {question}
      </div>

      {/* <div className="text-center m-2 p-3  w-full bg-slate-500 rounded-xl ">
        <p className="font-bold"> Choices</p>
      </div> */}

      <div>
        {choices.map((choice, index) => (
          <Option
            key={index}
            choice={choice}
            index={index}
            handleOptionClick={handleOptionClick}
            selectedOption={selectedOption}
          />
        ))}
      </div>
    </div>
  );
}

function Quiz() {
  const [currQ, setCurrQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [currScore, setCurrScore] = useState(0);
  const [checkDisable, setCheckDisable] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [message, setMessage] = useState("");
  function handleOptionClick(index) {
    if (!checkDisable) {
      setSelectedOption(index);
      setMessage("");
    }
  }

  function checkCorrect() {
    if (selectedOption === -1) {
      setMessage("Kindly select an option");
      return;
    }
    setCheckDisable(true);
    // console.log(questions[currQ].choices[selectedOption]);
    // console.log(questions[currQ].correct);
    if (questions[currQ].choices[selectedOption] === questions[currQ].correct) {
      setCurrScore(() => currScore + 1);
      setMessage("Correct");
    } else {
      setMessage(`The correct ans is: ${questions[currQ].correct} `);
    }
  }
  function handleNextQuestion() {
    if (selectedOption === -1) {
      setMessage("Kindly select an option");
      return;
    }
    if (!checkDisable) {
      setMessage("Kindly check your answer");
      return;
    }
    setMessage("");
    if (currQ + 1 === questions.length) {
      setCompleted(true);
    }
    setCurrQ(() => (currQ + 1 < questions.length ? currQ + 1 : currQ));
    setSelectedOption(-1);
    setCheckDisable(false);
  }

  return (
    <div className="bg-black h-screen">
      <div className="sticky top-0 bg-black">
        <NavBar />
      </div>
      <div className="rounded-xl m-4 p-4 h-5/6 bg-slate-800">
        <div className="rounded-xl m-4 p-4 bg-slate-700 h-full">
          <div className="rounded-xl m-2 p-2 bg-slate-600 h-full">
            {!completed ? (
              <div>
                <div className="flex p-4 pb-0 justify-between">
                  <div className="m-2 p-3 bg-slate-500 rounded-xl">
                    <span className="font-bold">
                      Question {currQ + 1} / {questions.length}{" "}
                    </span>
                  </div>
                  <div className="m-2 p-3 bg-slate-500 rounded-xl">
                    <span className="font-bold">
                      {" "}
                      Score {currScore} / {questions.length}
                    </span>
                  </div>
                </div>
                <div className="p-4 pb-0">
                  <Question
                    question={questions[currQ].question}
                    choices={questions[currQ].choices}
                    handleOptionClick={handleOptionClick}
                    selectedOption={selectedOption}
                  />
                </div>
                {message !== "" ? (
                  <div className="p-4 pb-0">
                    <div className="text-center p-4 w-full bg-slate-400 rounded-xl">
                      {" "}
                      {message}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex p-4">
                  <button
                    disabled={checkDisable}
                    onClick={checkCorrect}
                    className={`m-2 p-4 w-full bg-slate-400 rounded-xl 
                `}
                  >
                    Check Answer
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="m-2 p-4 w-full bg-slate-400 rounded-xl"
                  >
                    Next Question
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full m-2 p-3 bg-slate-500 rounded-xl text-xl font-bold text-white text-center ">
                <div className="flex h-full items-center justify-center ">
                  <div>
                    <p>Congratulations</p>
                    <p> You have completed the quiz </p>
                    <p>
                      Your Final Score {currScore} / {questions.length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
