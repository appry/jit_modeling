import { OPTIMISE } from "./types";

export const optimise = model => {
  return {
    type: OPTIMISE,
    payload: model
  };
};
