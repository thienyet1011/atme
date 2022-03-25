import { actionProps } from './index';
import isEmpty from "../validation/is-empty";

import {
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  SET_CURRENT_USER,
} from "../actions/types";

interface authReducerProps {
  success: boolean,
  isAuth: boolean,
  user: any,
};

const initialState: authReducerProps = {
  success: false,
  isAuth: false,
  user: null
};

export default function authReducer(state = initialState, action: actionProps) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        success: action.payload,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        success: action.payload,
      };
    default:
      return state;
  }
}
