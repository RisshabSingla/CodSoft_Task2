import NavBar from "../components/NavBar";

const recommenended = [
  {
    name: "first",
    code: "isjdvnlkn",
  },
  {
    name: "second",
    code: "oiajkerkc",
  },
  {
    name: "third",
    code: "sdkcnjkd",
  },
  {
    name: "fourth",
    code: "apefkkck",
  },
];

function Dashboard() {
  return (
    <div className="bg-black h-screen">
      <div>
        <NavBar />
      </div>
      <div className="rounded-xl m-4 p-4 h-5/6 bg-slate-800 ">
        <div className="rounded-xl m-4 p-4 bg-slate-700 h-full">
          <div className="rounded-xl m-2 p-2 bg-slate-600 h-full">
            <div className="m-5 p-3">
              <div className="block md:flex justify-around">
                <div className="bg-slate-300 rounded-lg p-2 font-bold text-lg m-2 ">
                  <div className="px-3">Name</div>
                  <div className="px-3 ">Email</div>
                  <div className="block sm:flex">
                    <div className="p-2">
                      <div className=""> Quizzes Made</div>
                      <div className=""> 4</div>
                    </div>
                    <div className="p-2">
                      <div className=""> Quizzes Attended</div>
                      <div className=""> 5</div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-300 rounded-lg p-2 font-bold text-lg m-2">
                  <div className="p-2 text-center">Quiz Tools</div>
                  <div className="sm:flex justify-around	">
                    <button>
                      <div className="m-2 p-3 bg-slate-400 rounded-xl">
                        Build Quiz
                      </div>
                    </button>
                    <button>
                      <div className="m-2 p-3 bg-slate-400 rounded-xl">
                        Attend Quiz
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-bold text-xl rounded-xl bg-slate-300 m-5 p-3">
              <div>
                <div className="grid grid-cols-5 p-2">
                  <div className="col-span-1">
                    <p> Serial No.</p>
                  </div>
                  <div className="col-span-2">
                    <p> Name</p>
                  </div>
                  <div className="col-span-2">
                    <p> Unique Code</p>
                  </div>
                </div>
                {recommenended.map((quiz, index) => (
                  <div className="grid grid-cols-5 p-2">
                    <div className="col-span-1">
                      <p> {index + 1}</p>
                    </div>
                    <div className="col-span-2">
                      <p> {quiz.name}</p>
                    </div>
                    <div className="col-span-2">
                      <button
                        className="flex"
                        onClick={() => {
                          navigator.clipboard.writeText(quiz.code);
                        }}
                      >
                        <img width="22px " src="./images/magnet.svg" alt="" />
                        {"  "}
                        <p>{quiz.code} </p>
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
  );
}

export default Dashboard;
