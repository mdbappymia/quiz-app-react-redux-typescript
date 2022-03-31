import { FC } from "react";
import { Quiz } from "../../../interfaces/interfaces";

interface IProps {
  question: Quiz;
  i: number;
}

const SingleQuestion: FC<IProps> = ({ question, i }) => {
  const { options, answer, user } = question;
  return (
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
  );
};

export default SingleQuestion;
