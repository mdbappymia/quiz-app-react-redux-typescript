import { getManageQuestion } from "../../functions/data";

export const allQuizForManage = () => {
  return (dispatch: any) => {
    getManageQuestion().then((data) => {
      dispatch(getAllQuestionForManage(data));
    });
  };
};

export const addQuestion = (payload: any) => {
  return {
    type: "ADD_QUESTION",
    payload,
  };
};

export const removeQuestion = (payload: any) => {
  return {
    type: "REMOVE_QUESTION",
    payload,
  };
};

export const getAllQuestionForManage = (payload: any) => {
  return {
    type: "GET_ALL_QUESTION_FOR_MANAGE",
    payload,
  };
};
