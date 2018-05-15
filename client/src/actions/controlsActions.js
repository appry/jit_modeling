import { SELECT_BUTTON } from "./types";

export const selectButton = button => {
  return {
    type: SELECT_BUTTON,
    payload: button
  };
};
