import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "../App";
import PrivetRoute from "../auth/PrivetRoute";
import AdminHome from "../Pages/Admin/AdminHome/AdminHome";
import ManageAllQuiz from "../Pages/Admin/ManageAllQuiz/ManageAllQuiz";
import Questions from "../Pages/QuestionPage/Questions/Questions";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";

import {
  allQuizForManage,
  getWithoutApproveQuiz,
} from "../redux/actions/adminAction";
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
