import { CREATE_PLACE } from "./types";
import { CREATE_TRANSITION } from "./types";
import { DELETE_NODE } from "./types";
import { MOVE_NODE } from "./types";
import { RENAME_NODE } from "./types";

export const createPlace = pos => {
  return {
    type: CREATE_PLACE,
    payload: pos,
    modelChanged: true
  };
};

export const createTransition = pos => {
  return {
    type: CREATE_TRANSITION,
    payload: pos,
    modelChanged: true
  };
};

export const deleteNode = pos => {
  return {
    type: DELETE_NODE,
    payload: pos,
    modelChanged: true
  };
};

export const moveNode = pos => {
  return {
    type: MOVE_NODE,
    payload: pos,
    modelChanged: true
  };
};

export const renameNode = pos => {
  return {
    type: RENAME_NODE,
    payload: pos,
    modelChanged: true
  };
};
