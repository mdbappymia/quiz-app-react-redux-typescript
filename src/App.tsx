import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addQuiz } from "./redux/actions/quizAction";
import quizs from "./assets/quizs.json";
import Quizes from "./components/Quizes/Quizes";
import AddQuestion from "./components/AddQuestion/AddQuestion";

const App: FC = () => {
  const dispatch = useDispatch();
  const [start, setStart] = useState(false);
  return (
    <div className="absolute h-full w-full bg-black">
      <h1 className="text-center font-bold text-3xl uppercase my-10 text-white">
        Simple Quiz App
      </h1>
      <p className="font-bold text-yellow-500 text-center w-72 mx-auto my-10">
        NB: Thik first then chose the answer. Because you can not undo the
        selected. answer
      </p>
      <div className="bg-white w-96 mx-auto p-10 rounded">
        {start ? (
          <Quizes />
        ) : (
          <div className="block text-center">
            <button
              className=" bg-green-600 px-5 font-bold text-white uppercase rounded hover:bg-green-700 py-3"
              onClick={() => setStart(true)}
            >
              Start
            </button>
          </div>
        )}
        <AddQuestion />
      </div>
    </div>
  );
};

export default App;
