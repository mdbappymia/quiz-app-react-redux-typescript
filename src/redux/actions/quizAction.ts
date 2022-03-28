import { getAllQuizes } from "../../functions/data";

export const allQuiz = () => {
  return (dispatch: any) => {
    getAllQuizes().then((data) => {
      dispatch(setQuizLoading(false));
      dispatch(getQuizes(data));
    });
  };
};

export const getQuizes = (payload: any) => {
  return {
    type: "GET_ALL_QUIZ",
    payload,
  };
};
export const setQuizLoading = (payload: boolean) => {
  return {
    type: "GET_DATA_LOADING",
    payload,
  };
};

export const userSelectedAnswer = (payload: any) => {
  return {
    type: "ADD_USER_ANSWER",
    payload,
  };
};

export const calculateResult = () => {
  return {
    type: "CALCULATE_RESULT",
  };
};

export const addNewQuestion = (payload: any) => {
  return {
    type: "ADD_NEW_QUESTION",
    payload,
  };
};
