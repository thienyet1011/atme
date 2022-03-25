import { combineReducers } from "redux";

import authReducer from "./auth.reducer";
import errorsReducer from "./error.reducer";

import { ATME_APP_PREFIX } from "../config";

export interface actionProps {
  type: string,
  payload: any,
}

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
});
