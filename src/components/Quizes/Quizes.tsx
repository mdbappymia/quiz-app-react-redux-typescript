import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import SingleQuiz from "../SingleQuiz/SingleQuiz";

const Quizes: FC = () => {
  const [displayIndex, setDisplayIndex] = useState(0);
  const allQuizes = useSelector((state: RootState) => state.quiz.subjectQuiz);
  const score = useSelector((state: RootState) => state.quiz.userScore);
  const user = useSelector((state: RootState) => state.users.user);
  const displayQuiz = allQuizes[displayIndex];

  return (
    <div>
      {displayIndex < allQuizes.length ? (
        <SingleQuiz
          setDisplayIndex={setDisplayIndex}
          displayIndex={displayIndex}
          key={displayQuiz.id}
          quiz={displayQuiz}
        />
      ) : (
        <div className="text-center">
          <h1 className="font-bold text-2xl my-3">Result</h1>
          <p>
            Hey <span>{user.displayName}</span>
          </p>
          <p>
            Your Score {score} out of {allQuizes.length}
          </p>
          <button
            className=" bg-amber-600 px-3 py-1 my-3 text-white rounded hover:bg-amber-700"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Quizes;
