import nodeTypeEnum from "./utils/nodeTypeEnum";
import defaultSetiings from "./config/defaultSettings";
const uuidv4 = require("uuid/v4");

function Node(x, y, name, nodeType) {
  this.x = x;
  this.y = y;
  this.name = name;
  this.nodeType = nodeType;
  this.inputs = [];
  this.outputs = [];
  this.id = uuidv4();
}

export function Place(x, y, name = "Place") {
  Node.call(this, x, y, name, nodeTypeEnum.PLACE);
  this.radius = defaultSetiings.radius;
}

export function Transition(x, y, name = "Transition") {
  Node.call(this, x, y, name, nodeTypeEnum.TRANSITION);
  this.time = 1;
  this.width = defaultSetiings.width;
  this.height = defaultSetiings.height;
  this.isFinal = false;
  this.fee = 1;
  this.storagePrice = 1;
  this.products = {};
}

export function Edge(nodeFrom, nodeTo, x1, y1, x2, y2, name = "Edge") {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.products = {};
  this.nodeFrom = nodeFrom;
  this.nodeTo = nodeTo;
  this.name = name;
  this.id = uuidv4();
}

export function ElementProduct(product, amount) {
  this.product = product;
  this.amount = amount;
  this.id = uuidv4();
}
export function Product(name, storagePrice) {
  this.name = name;
  this.storagePrice = storagePrice;
  this.id = uuidv4();
}

export function Supplier(name) {
  this.name = name;
  this.id = uuidv4();
}

export function Supply(product, supplier, max, time, price) {
  this.product = product;
  this.supplier = supplier;
  this.max = max;
  this.time = time;
  this.price = price;
  this.id = uuidv4();
}

export function Model() {
  this.nodes = {};
  this.edges = {};
  this.products = {};
  this.suppliers = {};
  this.supplies = {};
  this.elementsOrder = [];
}
