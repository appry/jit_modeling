import {
  CREATE_PLACE,
  CREATE_TRANSITION,
  DELETE_NODE,
  MOVE_NODE,
  RENAME_NODE,
  CREATE_EDGE,
  DELETE_EDGE,
  RENAME_EDGE,
  SELECT_ELEMENT,
  DELETE_SELECTED,
  COPY_SELECTED,
  TO_FRONT,
  TO_BACK,
  CREATE_SUPPLIER,
  DELETE_SUPPLIER,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_SUPPLY,
  DELETE_SUPPLY,
  UPDATE_SUPPLIER,
  UPDATE_PRODUCT,
  UPDATE_SUPPLY,
  UPDATE_PROPERTIES,
  CREATE_ELEMENT_PRODUCT,
  DELETE_ELEMENT_PRODUCT,
  UPDATE_ELEMENT_PRODUCT
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
export const deleteSelected = () => {
  return {
    type: DELETE_SELECTED,
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

export const copySelected = () => {
  return {
    type: COPY_SELECTED,
    modelChanged: true
  };
};

export const toFront = () => {
  return {
    type: TO_FRONT,
    modelChanged: true
  };
};

export const toBack = () => {
  return {
    type: TO_BACK,
    modelChanged: true
  };
};

export const createSupplier = args => {
  return {
    type: CREATE_SUPPLIER,
    payload: args,
    modelChanged: true
  };
};

export const deleteSupplier = id => {
  return {
    type: DELETE_SUPPLIER,
    payload: id,
    modelChanged: true
  };
};

export const createProduct = args => {
  return {
    type: CREATE_PRODUCT,
    payload: args,
    modelChanged: true
  };
};

export const deleteProduct = id => {
  return {
    type: DELETE_PRODUCT,
    payload: id,
    modelChanged: true
  };
};

export const createSupply = args => {
  return {
    type: CREATE_SUPPLY,
    payload: args,
    modelChanged: true
  };
};

export const deleteSupply = id => {
  return {
    type: DELETE_SUPPLY,
    payload: id,
    modelChanged: true
  };
};

//update
export const updateSupplier = data => {
  return {
    type: UPDATE_SUPPLIER,
    payload: data,
    modelChanged: true
  };
};

export const updateProduct = data => {
  return {
    type: UPDATE_PRODUCT,
    payload: data,
    modelChanged: true
  };
};

export const updateSupply = data => {
  return {
    type: UPDATE_SUPPLY,
    payload: data,
    modelChanged: true
  };
};

export const updateProperties = data => {
  return {
    type: UPDATE_PROPERTIES,
    payload: data,
    modelChanged: true
  };
};

export const createElementProduct = args => {
  return {
    type: CREATE_ELEMENT_PRODUCT,
    payload: args,
    modelChanged: true
  };
};

export const deleteElementProduct = args => {
  return {
    type: DELETE_ELEMENT_PRODUCT,
    payload: args,
    modelChanged: true
  };
};

export const updateElementProduct = args => {
  return {
    type: UPDATE_ELEMENT_PRODUCT,
    payload: args,
    modelChanged: true
  };
};
