import { FC, useEffect, useState } from "react";
import Quizes from "./components/Quizes/Quizes";
import AddQuestion from "./components/AddQuestion/AddQuestion";
import useFirebase from "./hooks/useFirebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store/store";
import { allQuiz, setSubjectQuiz } from "./redux/actions/quizAction";

const App: FC = () => {
  const [start, setStart] = useState(false);
  const dispatch = useDispatch();
  const [addQuestion, setAddQuestion] = useState(false);
  const [subjectName, setSubjectName] = useState("all");
  const user = useSelector((state: RootState) => state.users.user);
  const isLoading = useSelector((state: RootState) => state.users.isLoading);
  const subjects = useSelector((state: RootState) => state.quiz.subjects);
  const { googleSignIn, logOut } = useFirebase();
  useEffect(() => {
    dispatch(allQuiz());
  }, [dispatch]);
  console.log(subjects);
  if (isLoading) {
    return (
      <div className="flex bg-black min-h-screen justify-center items-center">
        <h1 className="text-white font-bold text-4xl uppercase">Loaidng ...</h1>
      </div>
    );
  }

  return (
    <div className=" min-h-screen py-10 w-full bg-black">
      <h1 className="text-center font-bold text-3xl uppercase my-3 text-white">
        Simple Quiz App
      </h1>
      <h1 className="text-white text-center">{user.displayName}</h1>
      <div className="text-center">
        {!user.email ? (
          <button
            className=" bg-lime-600 mx-3 px-5 font-bold text-white uppercase rounded hover:bg-green-700 py-3"
            onClick={googleSignIn}
          >
            login
          </button>
        ) : (
          <button
            className=" bg-red-600 mx-3 px-5 font-bold text-white uppercase rounded hover:bg-red-700 py-3"
            onClick={logOut}
          >
            Log out
          </button>
        )}
      </div>
      <p className="font-bold text-yellow-500 text-center w-72 mx-auto my-10">
        NB: Thik first then chose the answer. Because you can not undo the
        selected. answer
      </p>
      <div className="bg-white w-96 mx-auto p-10 rounded">
        {/* {!start && (
          
        )} */}
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
    </div>
  );
};

export default App;
