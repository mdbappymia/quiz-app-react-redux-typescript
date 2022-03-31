import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import AdminHome from "../Pages/Admin/AdminHome/AdminHome";
import Questions from "../Pages/QuestionPage/Questions/Questions";

import { getWithoutApproveQuiz } from "../redux/actions/adminAction";
import { allQuiz } from "../redux/actions/quizAction";

const RouterComponent: FC = () => {
  const [result, setResult] = useState<any>({});
  const dispatch = useDispatch();
  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem("result") || "[]"));
    dispatch(getWithoutApproveQuiz());
    dispatch(allQuiz());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<App result={result} setResult={setResult} />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/questions" element={<Questions />} />
    </Routes>
  );
};

export default RouterComponent;
