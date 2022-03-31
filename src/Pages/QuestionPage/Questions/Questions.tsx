import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Quiz } from "../../../interfaces/interfaces";
import {
  addQuestion,
  removeQuestion,
} from "../../../redux/actions/questionAction";
import { RootState } from "../../../redux/store/store";
import SingleQuestion from "../SingleQuestion/SingleQuestion";

const Questions: FC = () => {
  const dispatch = useDispatch();
  const selectedQuestion = useSelector(
    (state: RootState) => state.question.questions
  );
  const allQuiz = useSelector((state: RootState) => state.quiz.quizes);
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
    if (selectedQuestion.find((item) => item.id === question.id)) {
      dispatch(removeQuestion(question.qid));
      return;
    }
    dispatch(addQuestion({ ...question }));
  };

  return (
    <div className="bg-black min-h-screen pb-10">
      <h1 className="text-center font-bold uppercase text-4xl py-5 text-white">
        Questions
      </h1>
      <Link className="text-white" to="/print">
        Print
      </Link>
      <div className="container mx-auto h-72 bg-white p-5 overflow-auto">
        <ol className="list-item ">
          {selectedQuestion.map((question: Quiz) => (
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
          ))}
        </ol>
      </div>
      <div className="flex gap-5 my-5 container mx-auto justify-center">
        <div className="">
          <label className="block text-gray-300 text-sm">
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
          <label className="block text-gray-300 text-sm">
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
          <label className="block text-gray-300 text-sm">
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
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {displayQuestion.map((question: Quiz, i: number) => (
          <SingleQuestion
            key={i}
            handleSelectQuestion={handleSelectQuestion}
            i={i}
            question={question}
          />
        ))}
      </div>
    </div>
  );
};

export default Questions;
