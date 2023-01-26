import { combineReducers } from "redux";
import postsStore from "./postsStore";
import authStore from "./authStore";
export const reducers = combineReducers({ postsStore,authStore});