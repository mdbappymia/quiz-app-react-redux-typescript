import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import { setSubjectQuiz } from "./redux/actions/quizAction";
import { setUser } from "./redux/actions/userAction";
import Quizes from "./Pages/QuizPage/Quizes/Quizes";
import AddQuestion from "./Pages/QuizPage/AddQuestion/AddQuestion";

interface IProps {
  result: any;
}

const App: FC<IProps> = ({ result }) => {
  document.title = "Home";
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();
  const [addQuestion, setAddQuestion] = useState(false);
  const [subjectName, setSubjectName] = useState("all");

  const user = useSelector((state: RootState) => state.users.user);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const subjects = useSelector((state: RootState) => state.quiz.subjects);
  const initialWait = useSelector((state: RootState) => state.quiz.initialWait);

  if (isLoading) {
    return (
      <div className="flex bg-black min-h-screen justify-center items-center px-3">
        <h1 className="text-white font-bold text-4xl uppercase">Loaidng ...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 w-full bg-black px-3">
      <h1 className="text-center font-bold text-3xl uppercase my-3 text-white">
        Simple Quiz App
      </h1>
      <h1 className="text-white text-center font-bold uppercase">
        {user.displayName}
      </h1>

      <p className="font-bold text-yellow-500 text-center w-72 mx-auto my-5">
        NB: Thiking first then chose the answer. Because you can not undo the
        selected answer.
      </p>

      {!user.uid && (
        <div className="text-center my-1 text-black">
          <input
            className="p-1"
            placeholder="Enter your name"
            type="text"
            name=""
            id=""
            onChange={(e) => dispatch(setUser({ displayName: e.target.value }))}
          />
        </div>
      )}
      {!initialWait && (
        <div className="bg-white max-w-sm mx-auto p-10 rounded">
          {start ? (
            <Quizes />
          ) : addQuestion ? (
            <AddQuestion />
          ) : (
            <div className="block text-center">
              <div className=" my-2 mx-auto">
                <h1>Select your subject</h1>
                <select
                  onChange={(e: any) => setSubjectName(e.target.value)}
                  className="my-1 w-full border p-2"
                >
                  <option value="all">All</option>
                  {subjects.map((item: string, i: number) => (
                    <option key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className=" bg-green-600 px-5 font-bold text-white uppercase rounded hover:bg-green-700 py-3"
                onClick={() => {
                  dispatch(setSubjectQuiz(subjectName));
                  setStart(true);
                  setAddQuestion(false);
                }}
              >
                Start
              </button>
              {user.email && (
                <button
                  className=" bg-lime-600 mx-3 px-5 font-bold text-white uppercase rounded hover:bg-green-700 py-3"
                  onClick={() => setAddQuestion(true)}
                >
                  Add Question
                </button>
              )}
            </div>
          )}
        </div>
      )}
      {!start && result.subject && (
        <div className="text-white text-center mt-3">
          <p>Your last result is</p>
          <p>Subject: {result.subject}</p>
          <p>Score: {result.score.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
