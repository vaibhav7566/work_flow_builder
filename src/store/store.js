import { configureStore } from "@reduxjs/toolkit";
import workflowReducer from "../features/workflowSlice";

export const store = configureStore({
  reducer: {
    workflow: workflowReducer
  }
});
