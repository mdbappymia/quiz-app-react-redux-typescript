import { FC } from "react";
import { useSelector } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/store/store";
import SingleQuestionPrint from "../SingleQuestionPrint/SingleQuestionPrint";

const PrintPageHome: FC = () => {
  const allSelectedQuestion = useSelector(
    (state: RootState) => state.question.questions
  );
  console.log(allSelectedQuestion);
  return (
    <div className="m-5 border-4 p-10 container mx-auto">
      <h1 className="text-center uppercase font-bold text-4xl mb-10">
        Question
      </h1>
      <hr />
      <div className="grid grid-cols-2 gap-5 my-10">
        {allSelectedQuestion.map((question: Quiz, i: number) => (
          <SingleQuestionPrint i={i} question={question} key={question.qid} />
        ))}
      </div>
    </div>
  );
};

export default PrintPageHome;
