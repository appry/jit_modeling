import { CREATE_NODE } from "./types";
import { DELETE_NODE } from "./types";
import { MOVE_NODE } from "./types";
import { RENAME_NODE } from "./types";

export const createPlace = pos => {
  return {
    type: CREATE_NODE,
    payload: pos,
    modelChanged: true
  };
};

export const deletePlace = pos => {
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
