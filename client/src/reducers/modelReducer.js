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
} from "../actions/types";

import { Place, Transition, Edge, Product } from "../modelClasses";

const initialState = {
  nodes: {},
  edges: {},
  products: {},
  supplies: {},
  suppliers: {},
  elementsOrder: [],
  selected: null
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
        },
        elementsOrder: [...state.elementsOrder, newPlace.id],
        selected: newPlace.id
      };
    }
    case CREATE_TRANSITION: {
      const newTransition = new Transition(action.payload.x, action.payload.y);
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [newTransition.id]: newTransition
        },
        elementsOrder: [...state.elementsOrder, newTransition.id],
        selected: newTransition.id
      };
    }
    case MOVE_NODE: {
      const node = state.nodes[action.payload.id];
      const updatedNode = { ...node };
      updatedNode.x = action.payload.x;
      updatedNode.y = action.payload.y;
      return {
        ...state,
        nodes: { ...state.nodes, [updatedNode.id]: updatedNode }
      };
    }
    case CREATE_EDGE: {
      const data = action.payload;
      const newEdge = new Edge(
        data.nodeFrom,
        data.nodeTo,
        data.x1,
        data.y1,
        data.x2,
        data.y2
      );
      return {
        ...state,
        edges: {
          ...state.edges,
          [newEdge.id]: newEdge
        },
        elementsOrder: [...state.elementsOrder, newEdge.id],
        selected: newEdge.id
      };
    }
    case SELECT_ELEMENT: {
      return {
        ...state,
        selected: action.payload
      };
    }
    default:
      return state;
  }
}
