import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizesMade({ made = [] }) {
  return (
    <div>
      <div className="p-4 text-2xl flex justify-evenly">
        <h1 className="text-white"> Quizes Made By You</h1>
      </div>
      <div className="p-4 pt-0 text-xl flex justify-evenly text-white">
        {made?.length === 0 ? (
          "You have made 0 quizes"
        ) : (
          <div>
            <div className="text-black font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
              <div className="">
                <div className="grid grid-cols-7 p-2">
                  <div className="col-span-1">
                    <p className="truncate"> Serial No.</p>
                  </div>
                  <div className="col-span-2">
                    <p className="truncate"> Name</p>
                  </div>
                  <div className="col-span-2">
                    <p className="truncate"> Description</p>
                  </div>
                  <div className="col-span-2">
                    <p className="truncate"> Unique Code</p>
                  </div>
                </div>
                {made.map((quiz, index) => (
                  <div className=" grid grid-cols-8 p-2">
                    <div className="col-span-1">
                      <p className="truncate"> {index + 1}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> {quiz.name}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> {quiz.description}</p>
                    </div>
                    <div className="col-span-3">
                      <button
                        className="flex w-full"
                        onClick={() => {
                          navigator.clipboard.writeText(quiz._id);
                        }}
                      >
                        <img width="22px " src="./images/magnet.svg" alt="" />
                        {"  "}
                        <p className="truncate	">{quiz._id} </p>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuizesAttended({ attended = [] }) {
  return (
    <div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Quizes Attended By You</h1>
        </div>
        <div className="p-4 pt-0 text-xl flex justify-evenly text-white">
          {attended?.length === 0 ? (
            "You have attended 0 quizes"
          ) : (
            <div>
              <div className="text-black font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
                <div className="">
                  <div className="grid grid-cols-7 p-2">
                    <div className="col-span-1">
                      <p className="truncate"> Serial No.</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Name</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Description</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Unique Code</p>
                    </div>
                  </div>
                  {attended?.map((quiz, index) => (
                    <div className=" grid grid-cols-8 p-2">
                      <div className="col-span-1">
                        <p className="truncate"> {index + 1}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="truncate"> {quiz.name}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="truncate"> {quiz.description}</p>
                      </div>
                      <div className="col-span-3">
                        <button
                          className="flex w-full"
                          onClick={() => {
                            navigator.clipboard.writeText(quiz._id);
                          }}
                        >
                          <img width="22px " src="./images/magnet.svg" alt="" />
                          {"  "}
                          <p className="truncate	">{quiz._id} </p>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BuildQuiz() {
  return (
    <div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Let's make a new Quiz!</h1>
        </div>
        <div className=" pt-0 text-xl flex justify-evenly text-white">
          <div className="p-2">
            <div className="grid grid-cols-3">
              <div className="p-4">Quiz Name</div>
              <div className="p-2 col-span-2">
                <input className="rounded-xl p-2 text-black w-full "></input>
              </div>
              <div className="p-4">Quiz Description</div>
              <div className="p-2 col-span-2">
                <input className="rounded-xl p-2 text-black w-full"></input>
              </div>
              <div>
                <button> Question 1</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendQuiz({ setQuiz }) {
  const navigate = useNavigate();
  const [quizID, setQuizID] = useState("");
  const [message, setMessage] = useState("");

  function handleInputChange(e) {
    // console.log(e.target.value);
    setQuizID(e.target.value);
  }
  function handleQuizAttend() {
    async function handle() {
      try {
        const res = await axios.get(`http://localhost:8080/api/quiz/${quizID}`);
        // console.log("getting");
        setMessage("Quiz starting");
        console.log(res.data.data);
        setQuiz(res.data.data);
        setTimeout(() => {
          navigate("/quiz");
        }, 1000);
      } catch (err) {
        setMessage(err?.response?.data?.message);
      }
    }

    // console.log("Hello");
    handle();
  }

  return (
    <div>
      <div>
        <div className="p-4 text-2xl flex justify-evenly">
          <h1 className="text-white"> Enter the Unique Code for the Quiz </h1>
        </div>
        {message !== "" ? (
          <div className="text-white pt-0 p-4 text-2xl flex justify-evenly ">
            {message}
          </div>
        ) : (
          ""
        )}

        <div className="p-4 pt-0 text-xl flex justify-evenly ">
          <input
            onChange={handleInputChange}
            value={quizID}
            className="p-4 rounded-xl"
          ></input>
          <button onClick={handleQuizAttend}>
            <img width="40px" src="./images/rightArrow.svg" alt="=>" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Overlay({ overlay, setOverlay, userSettings, setQuiz }) {
  return (
    <div className="w-screen fixed h-screen z-10  flex justify-center items-center">
      <div>
        <div className="flex justify-end text-white p-2">
          <button className="p-2" onClick={() => setOverlay("")}>
            <img width="20px " src="./images/cross.svg" alt="X"></img>
          </button>
        </div>
        <div className="bg-slate-700 opacity-90 rounded-2xl">
          {overlay === "made" ? (
            <QuizesMade made={userSettings.createdQuizes} />
          ) : (
            ""
          )}
          {overlay === "attended" ? (
            <QuizesAttended attended={userSettings.givenQuizes} />
          ) : (
            ""
          )}
          {overlay === "build" ? <BuildQuiz /> : ""}
          {overlay === "attend" ? <AttendQuiz setQuiz={setQuiz} /> : ""}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ loggedInID, userXAuth, setQuiz }) {
  const navigate = useNavigate();
  const [userSettings, setUserSettings] = useState([]);
  const [quizes, setQuizes] = useState([]);
  const [overlay, setOverlay] = useState("");
  axios.defaults.headers.common["x-auth-token"] = `${userXAuth}`;

  // User Details
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/${loggedInID}`
        );
        console.log(res.data);
        setUserSettings(res.data.data);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getQuizes() {
      try {
        const res = await axios.get(`http://localhost:8080/api/quiz/`);
        console.log(res.data);
        setQuizes(res.data.data);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    }
    getQuizes();
  }, []);

  return (
    <>
      {overlay !== "" ? (
        <Overlay
          userSettings={userSettings}
          overlay={overlay}
          setOverlay={setOverlay}
          setQuiz={setQuiz}
        />
      ) : (
        ""
      )}
      <div
        className={`bg-black h-screen ${overlay !== "" ? "opacity-20" : ""}`}
      >
        <div>
          <NavBar userSettings={userSettings} />
        </div>
        <div className="rounded-xl m-4 p-4 h-5/6 bg-slate-800 ">
          <div className="rounded-xl m-4 p-4 bg-slate-700 h-full">
            <div className="rounded-xl m-2 p-2 bg-slate-600 h-full overflow-auto">
              <div className="m-5 p-3">
                <div className="block md:flex justify-around">
                  <div className="bg-slate-300 rounded-lg p-2 font-bold text-lg m-2 ">
                    <div className="px-3">{userSettings?.name}</div>
                    <div className="px-3 ">{userSettings?.email}</div>

                    <div className="block sm:flex">
                      <button onClick={() => setOverlay("made")}>
                        <div className="p-2">
                          <div className=""> Quizzes Made</div>
                          <div className="">
                            {userSettings?.createdQuizes?.length}
                          </div>
                        </div>
                      </button>
                      <button onClick={() => setOverlay("attended")}>
                        <div className="p-2">
                          <div className=""> Quizzes Attended</div>
                          <div className="">
                            {" "}
                            {userSettings?.givenQuizes?.length}
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-300 rounded-lg p-2 font-bold text-lg m-2">
                    <div className="p-2 text-center">Quiz Tools</div>
                    <div className="sm:flex justify-around	">
                      <button onClick={() => setOverlay("build")}>
                        <div className="m-2 p-3 bg-slate-400 rounded-xl">
                          Build Quiz
                        </div>
                      </button>
                      <button onClick={() => setOverlay("attend")}>
                        <div className="m-2 p-3 bg-slate-400 rounded-xl">
                          Attend Quiz
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
                <div className="">
                  <div className="grid grid-cols-7 p-2">
                    <div className="col-span-1">
                      <p className="truncate"> Serial No.</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Name</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Description</p>
                    </div>
                    <div className="col-span-2">
                      <p className="truncate"> Unique Code</p>
                    </div>
                  </div>
                  {quizes.map((quiz, index) => (
                    <div className=" grid grid-cols-8 p-2">
                      <div className="col-span-1">
                        <p className="truncate"> {index + 1}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="truncate"> {quiz.name}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="truncate"> {quiz.description}</p>
                      </div>
                      <div className="col-span-3">
                        <button
                          className="flex w-full"
                          onClick={() => {
                            navigator.clipboard.writeText(quiz._id);
                          }}
                        >
                          <img width="22px " src="./images/magnet.svg" alt="" />
                          {"  "}
                          <p className="truncate	">{quiz._id} </p>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
