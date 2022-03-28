import { Action, Quiz } from "../../interfaces/interfaces";

interface QuizState {
  quizes: Array<Quiz> | any;
  userAnswer: Array<any> | any;
  userScore: number;
  loading: boolean;
  subjects: Array<string>;
}
const initialState: QuizState = {
  quizes: [],
  userAnswer: [],
  userScore: 0,
  loading: true,
  subjects: [],
};
const quizReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "GET_ALL_QUIZ": {
      const subjectFilterQuiz: any = [];
      if (action.payload.length !== 0) {
        for (let item of action.payload) {
          if (
            subjectFilterQuiz.find(
              (item2: Quiz) => item.subject === item2.subject
            ) ||
            subjectFilterQuiz.length === 0
          ) {
            subjectFilterQuiz.push(item.subject);
          }
        }
      }
      return {
        ...state,
        quizes: action.payload.sort(() => Math.random() - 0.5),
        subjects: [...state.subjects, ...subjectFilterQuiz],
      };
    }
    case "GET_DATA_LOADING": {
      return {
        ...state,
        loading: action.payload,
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
    case "ADD_NEW_QUESTION": {
      return {
        ...state,
        quizes: [...state.quizes, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default quizReducer;
