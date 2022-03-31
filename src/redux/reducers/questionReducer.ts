import { Action, Quiz } from "../../interfaces/interfaces";

export interface QuestionState {
  questions: Array<Quiz>;
}

const initialState = {
  questions: [],
};
const questionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_NEW_QUESTION": {
      return {
        ...state,
        questions: [...state.questions, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};
export default questionReducer;
