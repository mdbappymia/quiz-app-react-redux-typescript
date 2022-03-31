import { getAllQuizes } from "../../functions/data";
import { Quiz } from "../../interfaces/interfaces";

export const getWithoutApproveQuiz = () => {
  return (dispatch: any) => {
    getAllQuizes(false).then((data) => {
      dispatch(setAllWithoutApproveQuiz(data));
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
