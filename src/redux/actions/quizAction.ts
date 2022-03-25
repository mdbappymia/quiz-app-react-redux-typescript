export const addQuiz = (payload: any) => {
  return {
    type: "ADD",
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
