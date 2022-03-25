import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Quiz } from "../../interfaces/interfaces";
import {
  calculateResult,
  userSelectedAnswer,
} from "../../redux/actions/quizAction";
import { RootState } from "../../redux/store/store";

interface IProps {
  quiz: Quiz;
  setDisplayIndex: Function;
  displayIndex: number;
}
const SingleQuiz: FC<IProps> = ({ quiz, setDisplayIndex, displayIndex }) => {
  const dispatch = useDispatch();
  const [givenAnswer, setGivenAnswer] = useState("");
  const [disable, setDisable] = useState(false);
  const allQuizes = useSelector((state: RootState) => state.quiz.quizes);
  const { question, id, options, answer } = quiz;
  const handleNext = () => {
    dispatch(userSelectedAnswer({ givenAnswer, id }));
    setDisplayIndex(displayIndex + 1);
    if (displayIndex === allQuizes.length - 1) {
      dispatch(calculateResult());
    }
  };
  return (
    <div>
      <h1 className="text-black font-bold py-3">
        Q{id}: {question}
      </h1>
      <div>
        {options.map((item, i) => (
          <div key={i}>
            <input
              disabled={disable}
              onChange={(e) => {
                setGivenAnswer(e.target.value);
                setDisable(true);
              }}
              type="radio"
              id={item + i}
              name="option"
              value={item}
            />
            <label
              className={
                disable && answer === item
                  ? "text-green-500 font-bold mx-1"
                  : item === givenAnswer
                  ? "text-red-500 mx-1"
                  : "mx-1"
              }
              htmlFor={item + i}
            >
              {item}
            </label>
          </div>
        ))}
        <button
          className="bg-blue-500 font-bold text-white px-3 py-2 my-3 rounded hover:bg-indigo-900 active:bg-indigo-700"
          onClick={handleNext}
        >
          Next
        </button>
        {disable && <p>Answer: {answer}</p>}
      </div>
    </div>
  );
};

export default SingleQuiz;
