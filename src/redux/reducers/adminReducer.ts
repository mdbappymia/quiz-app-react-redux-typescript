import { Action, Quiz } from "../../interfaces/interfaces";

interface AdminState {
  withoutApproveQuiz: Array<Quiz>;
  manageQuestion: Array<Quiz>;
}
const initialState: AdminState = {
  withoutApproveQuiz: [],
  manageQuestion: [],
};

const adminReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_WITHOUT_APPROVE_QUIZ": {
      return {
        ...state,
        withoutApproveQuiz: action.payload,
      };
    }
    case "GET_ALL_QUESTION_FOR_MANAGE": {
      return {
        ...state,
        manageQuestion: action.payload,
      };
    }
    case "REMOVE_SINGLE_QUIZ": {
      return {
        ...state,
        withoutApproveQuiz: [
          ...state.withoutApproveQuiz.filter(
            (quiz: Quiz) => quiz.qid !== action.payload
          ),
        ],
        manageQuestion: state.manageQuestion.filter(
          (item) => item.qid !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
};

export default adminReducer;
