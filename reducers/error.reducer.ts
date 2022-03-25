import { actionProps } from './index';
import { GET_ERRORS } from "../actions/types";

interface errorReducerProps {
  message?: string,
}

const initialState: errorReducerProps = {
  message: null,
};

export default function errorReducer(state = initialState, action: actionProps) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
