import { combineReducers, createStore } from "redux";
import quizReducer from "../reducers/quizReducer";

const rootReducer = combineReducers({
  quiz: quizReducer,
});

export const store = createStore(rootReducer);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
