import { Action, Quiz } from "../../interfaces/interfaces";

interface AdminState {
  withoutApproveQuiz: Array<Quiz>;
}
const initialState: AdminState = {
  withoutApproveQuiz: [],
};

const adminReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_WITHOUT_APPROVE_QUIZ": {
      return {
        ...state,
        withoutApproveQuiz: action.payload,
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
      };
    }
    default: {
      return state;
    }
  }
};

export default adminReducer;
