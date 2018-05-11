import { SET_CONTROL } from "../actions/types";

const initialState = {
  selected: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONTROL:
      if (state.selected === action.payload) action.payload = null;
      return {
        selected: action.payload
      };
    default:
      return state;
  }
}
