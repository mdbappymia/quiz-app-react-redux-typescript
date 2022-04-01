import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Quiz } from "../../../interfaces/interfaces";
import { RootState } from "../../../redux/store/store";
import SingleQuiz from "../SingleQuiz/SingleQuiz";

const ManageAllQuiz = () => {
  const allQuestion = useSelector(
    (state: RootState) => state.admin.manageQuestion
  );
  const [displayQuestion, setDisplayQuestion] = useState(allQuestion);
  const [questionText, setQuestionText] = useState("");
  const [subjectText, setSubjectText] = useState("");
  const [userName, setUserName] = useState("");
  const handleFilter = useCallback(() => {
    setDisplayQuestion(
      allQuestion.filter(
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
  }, [questionText, subjectText, userName, allQuestion]);
  useEffect(() => {
    setDisplayQuestion(allQuestion);
    handleFilter();
  }, [allQuestion, handleFilter]);
  return (
    <div className="bg-black min-h-screen">
      <h1 className="text-center font-bold text-white uppercase text-4xl py-10">
        All question
      </h1>
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
      <div className="md:grid lg:grid-cols-4 md:grid-cols-2 gap-6 container mx-auto">
        {displayQuestion.map((item: Quiz, i: number) => (
          <SingleQuiz key={i} item={item} i={i} />
        ))}
      </div>
    </div>
  );
};

export default ManageAllQuiz;
