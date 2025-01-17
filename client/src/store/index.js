import {createStore, combineReducers} from "redux";
import { messageReducer } from "./messageReducer";

const rootReducer = combineReducers({
  messages: messageReducer
});

export const store = createStore(rootReducer);