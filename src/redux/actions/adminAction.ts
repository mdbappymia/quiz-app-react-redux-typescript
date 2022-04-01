import { getAllQuizes, getManageQuestion } from "../../functions/data";
import { Quiz } from "../../interfaces/interfaces";

export const getWithoutApproveQuiz = () => {
  return (dispatch: any) => {
    getAllQuizes(false).then((data) => {
      dispatch(setAllWithoutApproveQuiz(data));
    });
  };
};

export const allQuizForManage = () => {
  return (dispatch: any) => {
    getManageQuestion().then((data) => {
      dispatch(getAllQuestionForManage(data));
    });
  };
};

export const setAllWithoutApproveQuiz = (payload: Array<Quiz>) => {
  return {
    type: "SET_WITHOUT_APPROVE_QUIZ",
    payload,
  };
};

export const removeSinglequiz = (payload: any) => {
  return {
    type: "REMOVE_SINGLE_QUIZ",
    payload,
  };
};
export const getAllQuestionForManage = (payload: any) => {
  return {
    type: "GET_ALL_QUESTION_FOR_MANAGE",
    payload,
  };
};
