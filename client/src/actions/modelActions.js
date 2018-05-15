import {
  CREATE_PLACE,
  CREATE_TRANSITION,
  DELETE_NODE,
  MOVE_NODE,
  RENAME_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  RENAME_EDGE,
  SELECT_ELEMENT
} from "./types";

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

export const deleteNode = id => {
  return {
    type: DELETE_NODE,
    payload: id,
    modelChanged: true
  };
};

export const moveNode = args => {
  return {
    type: MOVE_NODE,
    payload: args,
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
export const createEdge = args => {
  return {
    type: CREATE_EDGE,
    payload: args,
    modelChanged: true
  };
};
export const deleteEdge = id => {
  return {
    type: DELETE_EDGE,
    payload: id,
    modelChanged: true
  };
};
export const selectElement = element => {
  return {
    type: SELECT_ELEMENT,
    payload: element,
    modelChanged: true
  };
};
