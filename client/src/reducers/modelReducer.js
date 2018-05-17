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
  RENAME_SUPPLIER
} from "../actions/types";
import nodeTypeEnum from "../utils/nodeTypeEnum";
import {
  Place,
  Transition,
  Edge,
  Product,
  Supplier,
  Supply
} from "../modelClasses";
import { getNormalPos } from "../utils/canvas/helpers";
import defaultSettings from "../config/defaultSettings";
const uuidv4 = require("uuid/v4");

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
      let nodeFrom = state.nodes[data.nodeFrom];
      let nodeTo = state.nodes[data.nodeTo];
      nodeFrom.outputs.push(newEdge.id);
      nodeTo.inputs.push(newEdge.id);
      return {
        ...state,
        edges: {
          ...state.edges,
          [newEdge.id]: newEdge
        },
        nodes: {
          ...state.nodes,
          [nodeFrom.id]: nodeFrom,
          [nodeTo.id]: nodeTo
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
    case DELETE_SELECTED: {
      if (!state.selected) return state;
      let id = state.selected;
      let selected = state.edges[id] || state.nodes[id];
      let edges = { ...state.edges };
      let nodes = { ...state.nodes };
      let elementsOrder = [];
      if (selected.nodeType) {
        edges = Object.filter(
          edges,
          edge => edge.nodeFrom !== id && edge.nodeTo !== id
        );
        let edgesToDelete = selected.inputs.concat(selected.outputs);
        for (let i = 0; i < state.elementsOrder.length; i++) {
          if (
            !edgesToDelete.find(edge => edge === state.elementsOrder[i]) &&
            state.elementsOrder[i] !== selected.id
          )
            elementsOrder.push(state.elementsOrder[i]);
        }
        delete nodes[id];
      } else {
        let nodeFrom = edges[id].nodeFrom;
        let nodeTo = edges[id].nodeTo;
        let index = nodes[nodeFrom].outputs.indexOf(id);
        nodes[nodeFrom].outputs.splice(index, 1);
        let index2 = nodes[nodeTo].inputs.indexOf(id);
        nodes[nodeTo].inputs.splice(index2, 1);
        for (let el of state.elementsOrder) {
          if (el !== selected.id) elementsOrder.push(el);
        }
        delete edges[id];
      }
      return {
        ...state,
        nodes,
        edges,
        elementsOrder,
        selected: null
      };
    }
    case COPY_SELECTED: {
      if (!state.selected) return state;
      let id = state.selected;
      let selected = state.edges[id] || state.nodes[id];
      if (selected.nodeType) {
        let copy = { ...selected };
        copy.id = uuidv4();
        let pos = getNormalPos({
          x: selected.x + defaultSettings.gridNodeSize,
          y: selected.y + defaultSettings.gridNodeSize
        });
        copy.x = pos.x;
        copy.y = pos.y;
        copy.inputs = copy.outputs = [];
        return {
          ...state,
          nodes: { ...state.nodes, [copy.id]: copy },
          elementsOrder: [...state.elementsOrder, copy.id],
          selected: copy.id
        };
      } else {
      }
      return state;
    }
    case TO_BACK: {
      if (!state.selected) return state;
      let id = state.selected;
      let selected = state.edges[id] || state.nodes[id];
      let elementsOrder = [...state.elementsOrder];
      let index = elementsOrder.indexOf(id);
      elementsOrder.splice(index, 1);
      elementsOrder.unshift(id);
      return {
        ...state,
        elementsOrder
      };
    }
    case TO_FRONT: {
      if (!state.selected) return state;
      let id = state.selected;
      let selected = state.edges[id] || state.nodes[id];
      let elementsOrder = [...state.elementsOrder];
      let index = elementsOrder.indexOf(id);
      elementsOrder.splice(index, 1);
      elementsOrder.push(id);
      return {
        ...state,
        elementsOrder
      };
    }
    case CREATE_SUPPLIER: {
      const newSupplier = new Supplier(action.payload);
      return {
        ...state,
        suppliers: { ...state.suppliers, [newSupplier.id]: newSupplier }
      };
    }
    case RENAME_SUPPLIER: {
      let supplier = state.suppliers[action.payload.id];

      return {
        ...state,
        suppliers: {
          ...state.suppliers,
          [supplier.id]: { ...supplier, name: action.payload.name }
        }
      };
    }
    default:
      return state;
  }
}
