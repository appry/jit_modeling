import { SELECT_BUTTON } from "../actions/types";

const initialState = {
  button: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_BUTTON:
      if (state.button === action.payload) action.payload = null;
      return {
        ...state,
        button: action.payload
      };

    default:
      return state;
  }
}
