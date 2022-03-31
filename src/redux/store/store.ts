import { applyMiddleware, combineReducers, createStore } from "redux";
import quizReducer from "../reducers/quizReducer";
import userReducer from "../reducers/userReducer";
import thunk from "redux-thunk";
import adminReducer from "../reducers/adminReducer";
import questionReducer from "../reducers/questionReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
  users: userReducer,
  admin: adminReducer,
  question: questionReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
