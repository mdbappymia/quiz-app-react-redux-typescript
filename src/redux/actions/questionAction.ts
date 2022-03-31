export const addQuestion = (payload: any) => {
  return {
    type: "ADD_NEW_QUESTION",
    payload,
  };
};

export const removeQuestion = (payload: any) => {
  return {
    type: "REMOVE_QUESTION",
    payload,
  };
};
