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
  RENAME_SUPPLIER,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  RENAME_PRODUCT,
  CHANGE_STORAGE_PRICE,
  CREATE_SUPPLY,
  DELETE_SUPPLY,
  CHANGE_SUPPLY_PRODUCT,
  CHANGE_SUPPLY_SUPPLIER,
  CHANGE_SUPPLY_PRICE,
  CHANGE_SUPPLY_TIME,
  CHANGE_SUPPLY_MAX,
  UPDATE_SUPPLIER,
  UPDATE_PRODUCT,
  UPDATE_SUPPLY
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

export const renameSupplier = args => {
  return {
    type: RENAME_SUPPLIER,
    payload: args,
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

///Supplies

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

export const changeSupplyProduct = product => {
  return {
    type: CHANGE_SUPPLY_PRODUCT,
    payload: product,
    modelChanged: true
  };
};

export const changeSupplySupplier = supplier => {
  return {
    type: CHANGE_SUPPLY_SUPPLIER,
    payload: supplier,
    modelChanged: true
  };
};

export const changeSupplyPrice = price => {
  return {
    type: CHANGE_SUPPLY_PRICE,
    payload: price,
    modelChanged: true
  };
};

export const changeSupplyTime = time => {
  return {
    type: CHANGE_SUPPLY_TIME,
    payload: time,
    modelChanged: true
  };
};

export const changeSupplyMax = max => {
  return {
    type: CHANGE_SUPPLY_MAX,
    payload: max,
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
