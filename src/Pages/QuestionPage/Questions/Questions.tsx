import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/store/store";
import SingleQuestion from "../SingleQuestion/SingleQuestion";

const Questions: FC = () => {
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
  return (
    <div className="bg-black min-h-screen pb-10">
      <h1 className="text-center font-bold uppercase text-4xl py-5 text-white">
        Questions
      </h1>
      <div>
        <div>
          <label className=" text-gray-400">Search by question name:</label>
          <input
            type="text"
            onChange={(e) => {
              setQuestionText(e.target.value);
            }}
          />
        </div>
        <div>
          <label className=" text-gray-400">Search by subject:</label>
          <input
            onChange={(e) => {
              setSubjectText(e.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <label className=" text-gray-400">Search by user name:</label>
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
          />
        </div>
        <button className="bg-white" onClick={handleFilter}>
          Search
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {displayQuestion.map((question: Quiz, i: number) => (
          <div key={question.qid} className="flex bg-white text-black p-3">
            <input type="checkbox" name="" id={question.id.toString()} />
            <label htmlFor={question.id.toString()}>
              <SingleQuestion i={i} question={question} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
