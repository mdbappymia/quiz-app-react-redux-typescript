import { FC, forwardRef } from "react";
import { Quiz } from "../../../interfaces/interfaces";
import SingleQuestionPrint from "../SingleQuestionPrint/SingleQuestionPrint";

const PrintPageHome: FC<any> = forwardRef(
  ({ allSelectedQuestion }, ref: any) => {
    window.document.title = "Your Question";
    return (
      <div ref={ref} className="">
        <h1 className="text-center uppercase font-bold text-4xl pb-2">
          Question
        </h1>
        <hr />
        <div
          className="grid grid-cols-2 gap-1 container mx-auto mt-3"
          style={{ fontSize: 10 }}
        >
          {allSelectedQuestion.map((question: Quiz, i: number) => (
            <SingleQuestionPrint i={i} question={question} key={question.qid} />
          ))}
        </div>
      </div>
    );
  }
);

export default PrintPageHome;
