import { SELECT_BUTTON, SELECT_ELEMENT } from "../actions/types";

const initialState = {
  button: null,
  element: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_BUTTON:
      if (state.button === action.payload) action.payload = null;
      return {
        ...state,
        button: action.payload
      };
    case SELECT_ELEMENT:
      return {
        ...state,
        element: action.payload
      };
    default:
      return state;
  }
}
