import { SET_CONTROL } from "./types";

//Set control
export const setControl = control => {
  return {
    type: SET_CONTROL,
    payload: control
  };
};
