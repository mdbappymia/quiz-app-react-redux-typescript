import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import PrivetRoute from "../auth/PrivetRoute";
import AdminHome from "../Pages/Admin/AdminHome/AdminHome";
import ManageAllQuiz from "../Pages/Admin/ManageAllQuiz/ManageAllQuiz";
import PrintPageHome from "../Pages/PrintPage/PrintPageHome/PrintPageHome";
import Questions from "../Pages/QuestionPage/Questions/Questions";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

import { getWithoutApproveQuiz } from "../redux/actions/adminAction";
import { allQuizForManage } from "../redux/actions/questionAction";
import { allQuiz } from "../redux/actions/quizAction";

const RouterComponent: FC = () => {
  const [result, setResult] = useState<any>({});
  const dispatch = useDispatch();
  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem("result") || "[]"));
    dispatch(getWithoutApproveQuiz());
    dispatch(allQuiz());
    dispatch(allQuizForManage());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="bg-black px-2">
        <Routes>
          <Route
            path="/"
            element={<App result={result} setResult={setResult} />}
          />
          <Route
            path="/admin"
            element={
              <PrivetRoute>
                <AdminHome />
              </PrivetRoute>
            }
          />
          <Route path="/questions" element={<Questions />} />
          <Route path="/print" element={<PrintPageHome />} />
          <Route
            path="/manage"
            element={
              <PrivetRoute>
                <ManageAllQuiz />
              </PrivetRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default RouterComponent;
