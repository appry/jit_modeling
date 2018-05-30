import {
  CREATE_PLACE,
  CREATE_TRANSITION,
  MOVE_NODE,
  CREATE_EDGE,
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
} from "../actions/types";
import nodeTypeEnum from "../utils/nodeTypeEnum";
import {
  Place,
  Transition,
  Edge,
  Product,
  Supplier,
  Supply,
  ElementProduct
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
        if (copy.nodeType === nodeTypeEnum.TRANSITION) {
          copy.products = {};
          for (let key of Object.keys(selected.products)) {
            let product = selected.products[key];
            let productCopy = { ...product };
            productCopy.id = uuidv4();
            copy.products[productCopy.id] = productCopy;
          }
        }
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
      const newSupplier = new Supplier(action.payload.name);
      return {
        ...state,
        suppliers: { ...state.suppliers, [newSupplier.id]: newSupplier }
      };
    }

    case DELETE_SUPPLIER: {
      const id = action.payload;
      const suppliers = { ...state.suppliers };
      const supplies = Object.filter(
        state.supplies,
        supply => supply.supplier !== id
      );
      delete suppliers[id];
      return {
        ...state,
        suppliers,
        supplies
      };
    }

    case CREATE_PRODUCT: {
      const newProduct = new Product(
        action.payload.name,
        action.payload.storagePrice
      );
      return {
        ...state,
        products: { ...state.products, [newProduct.id]: newProduct }
      };
    }

    case DELETE_PRODUCT: {
      const id = action.payload;
      const products = { ...state.products };
      const supplies = Object.filter(
        state.supplies,
        supply => supply.product !== id
      );
      let edges = { ...state.edges };
      for (let key of Object.keys(edges)) {
        let edge = edges[key];
        edge.products = Object.filter(
          edge.products,
          product => product.product !== id
        );
      }
      let nodes = { ...state.nodes };
      for (let key of Object.keys(nodes)) {
        let node = nodes[key];
        if (node.nodeType === nodeTypeEnum.TRANSITION) {
          node.products = Object.filter(
            node.products,
            product => product.product !== id
          );
        }
      }
      console.log(edges);
      delete products[id];
      return {
        ...state,
        products,
        supplies,
        edges
      };
    }
    //Supplies
    case DELETE_SUPPLY: {
      const id = action.payload;
      const supplies = { ...state.supplies };
      delete supplies[id];
      return {
        ...state,
        supplies
      };
    }

    case CREATE_SUPPLY: {
      const args = action.payload;
      const newSupply = new Supply(
        args.product,
        args.supplier,
        args.max,
        args.time,
        args.price
      );
      return {
        ...state,
        supplies: { ...state.supplies, [newSupply.id]: newSupply }
      };
    }

    //updates

    case UPDATE_SUPPLIER: {
      let supplier = { ...state.suppliers[action.payload.id] };
      const data = action.payload;
      supplier.name = data.name;
      return {
        ...state,
        suppliers: { ...state.suppliers, [supplier.id]: supplier }
      };
    }

    case UPDATE_PRODUCT: {
      let product = { ...state.products[action.payload.id] };
      const data = action.payload;
      product.name = data.name;
      product.storagePrice = data.storagePrice;
      return {
        ...state,
        products: { ...state.products, [product.id]: product }
      };
    }

    case UPDATE_SUPPLY: {
      let supply = { ...state.supplies[action.payload.id], ...action.payload };

      return {
        ...state,
        supplies: { ...state.supplies, [supply.id]: supply }
      };
    }

    case UPDATE_PROPERTIES: {
      console.log("update");
      console.log(action.payload);
      const id = action.payload.id;
      let element = state.nodes[id];
      if (element) {
        return {
          ...state,
          nodes: {
            ...state.nodes,
            [element.id]: { ...element, ...action.payload }
          }
        };
      } else {
        element = state.edges[id];
        if (!element) return state;
        return {
          ...state,
          edges: {
            ...state.edges,
            [element.id]: { ...element, ...action.payload }
          }
        };
      }
    }

    case CREATE_ELEMENT_PRODUCT: {
      const elementId = action.payload.elementId;
      const newProduct = new ElementProduct(
        action.payload.product,
        action.payload.amount
      );
      let element = state.nodes[elementId];
      if (element) {
        let updated = { ...element };
        updated.products[newProduct.id] = newProduct;
        return {
          ...state,
          nodes: {
            ...state.nodes,
            [updated.id]: updated
          }
        };
      } else {
        element = state.edges[elementId];
        if (!element) {
          return state;
        }
        let updated = { ...element };
        updated.products[newProduct.id] = newProduct;
        return {
          ...state,
          edges: {
            ...state.edges,
            [updated.id]: updated
          }
        };
      }
    }

    case DELETE_ELEMENT_PRODUCT: {
      const elementId = action.payload.elementId;
      const id = action.payload.id;

      let element = state.nodes[elementId];
      if (element) {
        let updated = { ...element };
        delete updated.products[id];
        return {
          ...state,
          nodes: {
            ...state.nodes,
            [updated.id]: updated
          }
        };
      } else {
        element = state.edges[elementId];

        if (!element) {
          return state;
        }
        let updated = { ...element };
        delete updated.products[id];
        return {
          ...state,
          edges: {
            ...state.edges,
            [updated.id]: updated
          }
        };
      }
    }

    case UPDATE_ELEMENT_PRODUCT: {
      const elementId = action.payload.elementId;
      const id = action.payload.id;

      let element = state.nodes[elementId];
      if (element) {
        if (!element.products[id]) {
          return state;
        }
        let updated = { ...element };
        updated.products[id].product = action.payload.product;
        updated.products[id].amount = action.payload.amount;
        return {
          ...state,
          nodes: {
            ...state.nodes,
            [updated.id]: updated
          }
        };
      } else {
        element = state.edges[elementId];

        if (!element || !element.products[id]) {
          return state;
        }
        let updated = { ...element };
        updated.products[id].product = action.payload.product;
        updated.products[id].amount = action.payload.amount;
        return {
          ...state,
          edges: {
            ...state.edges,
            [updated.id]: updated
          }
        };
      }
    }

    default:
      return state;
  }
}
