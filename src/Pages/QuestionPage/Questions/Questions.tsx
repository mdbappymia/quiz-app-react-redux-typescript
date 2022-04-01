import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Quiz } from "../../../interfaces/interfaces";
import {
  addQuestion,
  removeQuestion,
} from "../../../redux/actions/questionAction";
import { RootState } from "../../../redux/store/store";
import PrintPageHome from "../../PrintPage/PrintPageHome/PrintPageHome";
import SingleQuestion from "../SingleQuestion/SingleQuestion";

const Questions: FC = () => {
  const dispatch = useDispatch();
  const allQuiz = useSelector((state: RootState) => state.admin.manageQuestion);
  const allSelectedQuestion = useSelector(
    (state: RootState) => state.question.questions
  );
  const [displayQuestion, setDisplayQuestion] = useState(allQuiz);
  const [questionText, setQuestionText] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [userName, setUserName] = useState("");

  const handleFilter = useCallback(() => {
    setDisplayQuestion(
      allQuiz.filter(
        (item: Quiz) =>
          (questionText !== ""
            ? item.question.toLowerCase().includes(questionText.toLowerCase())
            : true) &&
          (subjectText !== ""
            ? item.subject.toLowerCase().includes(subjectText.toLowerCase())
            : true) &&
          (userName !== ""
            ? item.user?.toLowerCase()?.includes(userName.toLowerCase())
            : true)
      )
    );
  }, [questionText, subjectText, userName, allQuiz]);
  useEffect(() => {
    setDisplayQuestion(allQuiz);
    handleFilter();
  }, [allQuiz, handleFilter]);
  const handleSelectQuestion = (question: Quiz) => {
    if (allSelectedQuestion.find((item) => item.qid === question.qid)) {
      dispatch(removeQuestion(question.qid));
      return;
    }
    dispatch(addQuestion({ ...question }));
  };
  const componentRef: any = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="bg-black min-h-screen pb-10">
      <h1 className="text-center font-bold uppercase text-4xl py-5 text-white">
        Questions
      </h1>

      <div className="container mx-auto h-72 bg-white p-5 overflow-auto">
        <ol className="list-item ">
          {allSelectedQuestion.length > 0 ? (
            allSelectedQuestion.map((question: Quiz) => (
              <li
                className="border m-3 mr-0 p-3 pr-0 list-decimal flex justify-between"
                key={question.qid}
              >
                <p>{question.question}</p>
                <p>
                  <span
                    onClick={() => dispatch(removeQuestion(question.qid))}
                    className="bg-red-600 p-3 text-white font-bold cursor-pointer hover:bg-red-700 active:bg-red-800"
                  >
                    X
                  </span>
                </p>
              </li>
            ))
          ) : (
            <h1>Select question from below</h1>
          )}
        </ol>
      </div>
      <div className=" text-right container mx-auto bg-indigo-700 py-1">
        <button
          onClick={handlePrint}
          className="text-white bg-green-600 m-3 px-4 py-2 rounded hover:bg-green-700 active:bg-green-800"
        >
          Print
        </button>
      </div>
      <div className="lg:flex gap-5 my-5 container mx-auto justify-center">
        <div className="">
          <label className="block text-gray-300 text-sm mt-3">
            Search by question name:
          </label>
          <input
            className="p-1 mt-1 rounded"
            placeholder="Type here"
            type="text"
            onChange={(e) => {
              setQuestionText(e.target.value);
            }}
          />
        </div>
        <div className="">
          <label className="block text-gray-300 text-sm mt-3">
            Search by subject:
          </label>
          <input
            className="p-1 mt-1 rounded"
            placeholder="Type here"
            onChange={(e) => {
              setSubjectText(e.target.value);
            }}
            type="text"
          />
        </div>
        <div className="">
          <label className="block text-gray-300 text-sm mt-3">
            Search by user name:
          </label>
          <input
            className="p-1 mt-1 rounded"
            placeholder="Type here"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
          />
        </div>
      </div>
      <div className="md:grid lg:grid-cols-3 md:grid-cols-2 gap-4 container mx-auto">
        {displayQuestion.map((question: Quiz, i: number) => (
          <SingleQuestion
            key={i}
            handleSelectQuestion={handleSelectQuestion}
            i={i}
            question={question}
          />
        ))}
      </div>
      <div>
        <ReactToPrint content={() => componentRef.current} />
        <div className=" hidden">
          <PrintPageHome
            allSelectedQuestion={allSelectedQuestion}
            ref={componentRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Questions;
