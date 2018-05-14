import { SELECT_BUTTON, SELECT_ELEMENT } from "./types";

export const selectButton = button => {
  return {
    type: SELECT_BUTTON,
    payload: button
  };
};

export const selectElement = element => {
  return {
    type: SELECT_ELEMENT,
    payload: element
  };
};
