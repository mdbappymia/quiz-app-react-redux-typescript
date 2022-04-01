import { Action, Quiz } from "../../interfaces/interfaces";

export interface QuestionState {
  questions: Array<Quiz>;
}

const initialState: QuestionState = {
  questions: [],
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

    default: {
      return state;
    }
  }
};
export default questionReducer;
