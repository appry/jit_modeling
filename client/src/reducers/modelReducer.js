import {
  CREATE_PLACE,
  CREATE_TRANSITION,
  DELETE_NODE,
  MOVE_NODE,
  RENAME_NODE
} from "../actions/types";

import { Place, Transition, Edge, Product } from "../modelClasses";

const initialState = {
  nodes: {},
  edges: {},
  products: {},
  supplies: {},
  suppliers: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_PLACE: {
      const newPlace = new Place(action.payload.x, action.payload.y);
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [newPlace.id]: newPlace
        }
      };
    }
    case CREATE_TRANSITION: {
      const newTransition = new Transition(action.payload.x, action.payload.y);
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [newTransition.id]: newTransition
        }
      };
    }
    default:
      return state;
  }
}
