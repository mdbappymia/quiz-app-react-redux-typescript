import { FC } from "react";
import { Quiz } from "../../../interfaces/interfaces";

interface IProps {
  question: Quiz;
  i: number;
}

const SingleQuestionPrint: FC<IProps> = ({ question, i }) => {
  const { options } = question;
  return (
    <div>
      <h1 className="font-bold">
        Q{i + 1}: {question.question}
      </h1>
      <ul className="list-item list-decimal ml-10 my-2">
        {options.map((option, i) => (
          <li key={i}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default SingleQuestionPrint;
