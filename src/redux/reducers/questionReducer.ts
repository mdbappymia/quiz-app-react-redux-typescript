import { Action, Quiz } from "../../interfaces/interfaces";

export interface QuestionState {
  questions: Array<Quiz>;
  manageQuestion: Array<Quiz>;
}

const initialState: QuestionState = {
  questions: [],
  manageQuestion: [],
};
const questionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_QUESTION": {
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    }
    case "REMOVE_QUESTION": {
      return {
        ...state,
        questions: state.questions.filter(
          (item) => item.qid !== action.payload
        ),
      };
    }
    case "GET_ALL_QUESTION_FOR_MANAGE": {
      return {
        ...state,
        manageQuestion: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default questionReducer;
