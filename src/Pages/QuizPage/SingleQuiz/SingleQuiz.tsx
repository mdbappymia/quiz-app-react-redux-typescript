import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import {
  calculateResult,
  userSelectedAnswer,
} from "../../../redux/actions/quizAction";

interface IProps {
  quiz: Quiz;
  setDisplayIndex: Function;
  displayIndex: number;
}
const SingleQuiz: FC<IProps> = ({ quiz, setDisplayIndex, displayIndex }) => {
  const dispatch = useDispatch();
  const [givenAnswer, setGivenAnswer] = useState("");
  const [disable, setDisable] = useState(false);

  const { question, id, options, answer } = quiz;
  const handleNext = () => {
    dispatch(userSelectedAnswer({ givenAnswer, id }));
    setDisplayIndex(displayIndex + 1);
    dispatch(calculateResult());
  };

  return (
    <div>
      <h1 className="text-black font-bold py-3">
        Q{displayIndex + 1}: {question}
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
              className="cursor-pointer"
              value={item}
            />
            <label
              className={
                disable && answer === item
                  ? "text-green-500 font-bold mx-1 cursor-pointer"
                  : item === givenAnswer
                  ? "text-red-500 mx-1 cursor-pointer"
                  : "mx-1 cursor-pointer"
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
