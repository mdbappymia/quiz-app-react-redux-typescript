import { FC } from "react";
import { useSelector } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/store/store";

interface IProps {
  question: Quiz;
  i: number;
  handleSelectQuestion: Function;
}

const SingleQuestion: FC<IProps> = ({ question, i, handleSelectQuestion }) => {
  const selectedQuestion = useSelector(
    (state: RootState) => state.question.questions
  );

  const { options, answer, user, qid } = question;

  // console.log(question.qid);
  return (
    <div key={i} className="flex bg-white text-black p-3">
      <input
        className="mx-1 mt-2 w-10"
        type="checkbox"
        checked={Boolean(selectedQuestion.find((item) => item.qid === qid))}
        onChange={() => {
          handleSelectQuestion(question);
        }}
        id={question.id.toString()}
      />
      <label htmlFor={question.id.toString()}>
        <div>
          <h1>
            Q{i + 1}: {question.question}
          </h1>
          <ul className=" list-item list-decimal mx-5 my-2">
            {options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
          <p className="font-bold">Answer: {answer}</p>
          <p>{user}</p>
        </div>
      </label>
    </div>
  );
};

export default SingleQuestion;
