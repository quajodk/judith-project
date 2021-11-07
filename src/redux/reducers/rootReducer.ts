import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./app/appReducer";

const reducers = combineReducers({
  // reducers
  app: appReducer,
});

export default reducers;
