import { Quiz } from "../../interfaces/interfaces";

interface QuizState {
  quizes: Array<Quiz>;
  userAnswer: Array<any> | any;
  userScore: number;
}
const initialState: QuizState = {
  quizes: [],
  userAnswer: [],
  userScore: 0,
};
const quizReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        quizes: [...action.payload],
      };
    }
    case "ADD_USER_ANSWER": {
      return {
        ...state,
        userAnswer: [...state.userAnswer, action.payload],
      };
    }
    case "CALCULATE_RESULT": {
      let score = 0;
      for (let quiz of state.quizes) {
        for (let ans of state.userAnswer) {
          if (quiz.id === ans.id) {
            if (quiz.answer === ans.givenAnswer) {
              score++;
            }
          }
        }
      }
      return {
        ...state,
        userScore: score,
      };
    }
    default: {
      return state;
    }
  }
};

export default quizReducer;
