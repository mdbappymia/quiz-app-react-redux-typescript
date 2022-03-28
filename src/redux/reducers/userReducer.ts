import { Action } from "../../interfaces/interfaces";

export interface UserState {
  user: any;
  error: string;
  isLoading: boolean;
}
const initialState: UserState = {
  user: {},
  error: "",
  isLoading: true,
};

const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
export default userReducer;
