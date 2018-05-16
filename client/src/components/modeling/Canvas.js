import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";
import buttonsEnum from "../../utils/buttonsEnum";
import { Place, Transition, Edge, Product } from "../../modelClasses";
import {
  createPlace,
  createTransition,
  createEdge,
  deleteNode,
  renameNode,
  moveNode
} from "../../actions/modelActions";
import { selectElement } from "../../actions/modelActions";
import nodeTypeEnum from "../../utils/nodeTypeEnum";
import defaultSettings from "../../config/defaultSettings";
import { showElement, hideElement, getDist } from "../../utils/canvas/helpers";

const canvasActionType = {
  EDGE: "EDGE",
  MOVE: "MOVE",
  RESIZE: "RESIZE",
  NONE: "NONE"
};
class Canvas extends Component {
  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasGrid = document.getElementById("canvas-grid");
    this.ctxGrid = this.canvasGrid.getContext("2d");
    this.container = document.getElementById("canvas-container");
    this.fixDpi(this.canvas);
    this.fixDpi(this.canvasGrid);
    this.drawGrid(this.canvasGrid, this.ctxGrid, defaultSettings.gridNodeSize);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.selected) {
      this.selected = null;
    } else {
      this.selected =
        this.props.nodes[this.props.selected] ||
        this.props.edges[this.props.selected];
    }

    this.update();
  }
  update() {
    this.clearCanvas(this.canvas, this.ctx);
    if (!this.props.isActive) return;
    for (let elementId of this.props.elementsOrder) {
      let element = this.props.edges[elementId] || this.props.nodes[elementId];
      if (element.nodeType) {
        this.drawNode(element);
      } else {
        this.drawEdge(element);
      }
    }
  }
  onMouseDown(e) {
    if (!this.props.isActive) return;
    const mousePos = this.getMousePos(e);
    const storeState = store.getState();
    switch (storeState.controls.button) {
      case buttonsEnum.PLACE: {
        // let alignTopLeft = this.alignToGrid({
        //   x: mousePos.x - defaultSettings.radius,
        //   y: mousePos.y - defaultSettings.radius
        // });
        // alignTopLeft.x += defaultSettings.radius;
        // alignTopLeft.y += defaultSettings.radius;
        const alignTopLeft = this.alignPlace(mousePos);
        this.props.createPlace(alignTopLeft);
        break;
      }
      case buttonsEnum.TRANSITION: {
        // let alignTopLeft = this.alignToGrid({
        //   x: mousePos.x - defaultSettings.width / 2,
        //   y: mousePos.y - defaultSettings.height / 2
        // });
        // alignTopLeft.x += defaultSettings.width / 2;
        // alignTopLeft.y += defaultSettings.height / 2;
        const alignTopLeft = this.alignTransition(mousePos);
        this.props.createTransition(alignTopLeft);
        break;
      }
      case buttonsEnum.EDGE: {
        this.isMouseDown = true;
        this.startPos = mousePos;
        this.actionType = canvasActionType.EDGE;
        break;
      }
      default: {
        let element = this.findElementByPos(mousePos.x, mousePos.y);
        if (element) {
          this.startPos = mousePos;
          this.props.selectElement(element.id);
          this.isMouseDown = true;
          this.actionType = canvasActionType.MOVE;
        } else {
          this.props.selectElement(null);
        }
      }
    }
  }
  onMouseMove(e) {
    if (!this.props.isActive || !this.isMouseDown) return;
    const mousePos = this.getMousePos(e);
    if (
      mousePos.x <= 0 ||
      mousePos.x >= 2000 ||
      mousePos.y <= 0 ||
      mousePos.y >= 2000
    ) {
      this.onMouseUp(e);
    }
    const storeState = store.getState();
    this.endPos = mousePos;
    switch (this.actionType) {
      case canvasActionType.EDGE: {
        this.update();
        this.drawEdgePoint(
          this.startPos.x,
          this.startPos.y,
          defaultSettings.edgePointStart
        );
        this.drawEdgePoint(
          this.endPos.x,
          this.endPos.y,
          defaultSettings.edgePointEnd
        );
        this.drawLine(
          this.startPos.x,
          this.startPos.y,
          this.endPos.x,
          this.endPos.y,
          defaultSettings.strokeStyle
        );
        break;
      }
      case canvasActionType.MOVE: {
        //let x = mousePos.x + this.selected.x - this.startPos.x;
        //let aligned = this.alignToGrid(mousePos);
        // let alignTopLeft = this.alignToGrid({
        //   x: mousePos.x - defaultSettings.width / 2,
        //   y: mousePos.y - defaultSettings.height / 2
        // });
        // alignTopLeft.x += defaultSettings.width / 2;
        // alignTopLeft.y += defaultSettings.height / 2;
        if (this.selected.nodeType) {
          const newX = this.selected.x + mousePos.x - this.startPos.x;
          const newY = this.selected.y + mousePos.y - this.startPos.y;
          const alignedTopLeft = this.alignNode(
            {
              x: newX,
              y: newY
            },
            this.selected
          );
          if (
            !(
              this.selected.x === alignedTopLeft.x &&
              this.selected.y === alignedTopLeft.y
            )
          ) {
            this.props.moveNode({
              id: this.selected.id,
              x: alignedTopLeft.x,
              y: alignedTopLeft.y
            });
            this.startPos = {
              x: mousePos.x + alignedTopLeft.x - newX,
              y: mousePos.y + alignedTopLeft.y - newY
            };
          }
        } else {
        }

        break;
      }
    }
  }
  onMouseUp(e) {
    if (!this.props.isActive) return;
    const mousePos = this.getMousePos(e);
    switch (this.actionType) {
      case canvasActionType.EDGE: {
        this.update();
        let nodeFrom = this.findNodeByPos(this.startPos.x, this.startPos.y);
        let nodeTo = this.findNodeByPos(this.endPos.x, this.endPos.y);
        if (nodeFrom && nodeTo && nodeFrom.nodeType !== nodeTo.nodeType) {
          if (
            Object.find(
              this.props.edges,
              edge => edge.nodeFrom === nodeFrom.id && edge.nodeTo === nodeTo.id
            )
          ) {
            this.raiseError("Edge already exists");
          } else {
            this.props.createEdge({
              nodeFrom: nodeFrom.id,
              nodeTo: nodeTo.id,
              x1: this.startPos.x,
              y1: this.startPos.y,
              x2: this.endPos.x,
              y2: this.endPos.y
            });
          }
        } else {
          this.raiseError("Invalid connection");
        }
      }
    }
    this.isMouseDown = false;
    this.actionType = canvasActionType.NONE;
  }
  onMouseLeave(e) {
    this.onMouseUp(e);
  }
  alignNode(pos, node) {
    switch (node.nodeType) {
      case nodeTypeEnum.PLACE: {
        return this.alignPlace(pos, node.radius);
        break;
      }
      case nodeTypeEnum.TRANSITION: {
        return this.alignTransition(pos, node.width, node.height);
        break;
      }
    }
  }
  alignPlace(pos, radius = defaultSettings.radius) {
    let alignTopLeft = this.alignToGrid({
      x: pos.x - radius,
      y: pos.y - radius
    });
    alignTopLeft.x += radius;
    alignTopLeft.y += radius;
    return alignTopLeft;
  }
  alignTransition(
    pos,
    width = defaultSettings.width,
    height = defaultSettings.height
  ) {
    let alignTopLeft = this.alignToGrid({
      x: pos.x - width / 2,
      y: pos.y - height / 2
    });
    alignTopLeft.x += width / 2;
    alignTopLeft.y += height / 2;
    return alignTopLeft;
  }
  alignToGrid(pos) {
    const grid = defaultSettings.gridNodeSize;
    const gridHalf = grid / 2;
    let modX = pos.x % grid;
    let modY = pos.y % grid;
    let newPos = {};
    newPos.x = modX > gridHalf ? pos.x + grid - modX : pos.x - modX;
    newPos.y = modY > gridHalf ? pos.y + grid - modY : pos.y - modY;
    if (newPos.x < 0) newPos.x = 0;
    if (newPos.x > 2000) newPos.x = 2000;
    if (newPos.y < 0) newPos.y = 0;
    if (newPos.y > 2000) newPos.y = 2000;
    return newPos;
  }
  drawEdgePoint(x, y, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.arc(x, y, defaultSettings.edgePointRadius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawLine(x1, y1, x2, y2, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawArrow(x1, y1, x2, y2, strokeStyle) {
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineTo(
      x2 - headlen * Math.cos(angle - Math.PI / 6),
      y2 - headlen * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(
      x2 - headlen * Math.cos(angle + Math.PI / 6),
      y2 - headlen * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.stroke();
  }
  findElementByPos(x, y) {
    let selected = null;
    for (let i = this.props.elementsOrder.length - 1; i > -1; i--) {
      let elementId = this.props.elementsOrder[i];
      let element = this.props.nodes[elementId] || this.props.edges[elementId];
      if (element.nodeType) {
        if (this.checkNodeClick(x, y, element)) {
          selected = element;
          break;
        }
      } else {
        if (this.checkEdgeClick(x, y, element)) {
          selected = element;
          break;
        }
      }
    }
    return selected;
  }
  findNodeByPos(x, y) {
    let selected = null;
    for (let i = this.props.elementsOrder.length - 1; i > -1; i--) {
      let elementId = this.props.elementsOrder[i];
      let element = this.props.nodes[elementId];

      if (element && this.checkNodeClick(x, y, element)) {
        selected = element;
        break;
      }
    }
    return selected;
  }
  findEdgeByPos(x, y) {
    let selected = null;
    for (let key of Object.keys(this.props.edges)) {
      let edge = this.props.edges[key];
      if (this.checkEdgeClick(x, y, edge)) {
        selected = edge;
        break;
      }
    }
    return selected;
  }
  checkEdgeClick(x, y, e) {
    let nodeFrom, nodeTo;
    nodeFrom = this.props.nodes[e.nodeFrom];
    nodeTo = this.props.nodes[e.nodeTo];

    let pos = this.getEdgePos(nodeFrom, nodeTo);
    let temp =
      (pos.y1 - pos.y2) * x +
      (pos.x2 - pos.x1) * y +
      (pos.x1 * pos.y2 - pos.x2 * pos.y1);
    let distX = Math.abs(pos.x2 - pos.x1);
    let distY = Math.abs(pos.y2 - pos.y1);
    let lineRect =
      distX + 10 >= getDist(pos.x1, x) + getDist(pos.x2, x) &&
      distY + 10 >= getDist(pos.y1, y) + getDist(pos.y2, y);
    return Math.abs(temp) < 10000 && lineRect;
  }
  checkNodeClick(x, y, node) {
    switch (node.nodeType) {
      case nodeTypeEnum.PLACE: {
        return this.checkPlaceClick(x, y, node);
      }
      case nodeTypeEnum.TRANSITION: {
        return this.checkTransitionClick(x, y, node);
      }
    }
  }
  checkPlaceClick(x, y, p) {
    return this.checkRectBoundaries(x, y, {
      x: p.x,
      y: p.y,
      width: p.radius * 2,
      height: p.radius * 2
    });
  }
  checkTransitionClick(x, y, t) {
    return this.checkRectBoundaries(x, y, {
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    });
  }
  checkRectBoundaries(x, y, obj) {
    return (
      x > obj.x - obj.width / 2 &&
      x < obj.x + obj.width / 2 &&
      y > obj.y - obj.height / 2 &&
      y < obj.y + obj.height / 2
    );
  }
  getEdgePos(nodeFrom, nodeTo) {
    let x1, x2, y1, y2, p, t;
    switch (nodeFrom.nodeType) {
      case nodeTypeEnum.PLACE: {
        p = nodeFrom;
        t = nodeTo;
        x1 = nodeFrom.x;
        y1 = nodeFrom.y;
        x2 = nodeTo.x;
        y2 = nodeTo.y;
        break;
      }
      case nodeTypeEnum.TRANSITION: {
        t = nodeFrom;
        p = nodeTo;
        x2 = nodeFrom.x;
        y2 = nodeFrom.y;
        x1 = nodeTo.x;
        y1 = nodeTo.y;
        break;
      }
    }

    let distX = Math.abs(x2 - x1);
    let distY = Math.abs(y2 - y1);
    let dist = Math.sqrt(distX * distX + distY * distY);
    let k1 = p.radius / dist;
    let k2 = t.height / 2 / distY;
    let k3 = t.width / 2 / distX;
    let signX = Math.sign(t.x - p.x);
    let signY = Math.sign(t.y - p.y);
    x1 = x1 + signX * distX * k1;
    y1 = y1 + signY * distY * k1;
    x2 = x2 - signX * (distX * k2 < t.width / 2 ? distX * k2 : t.width / 2);
    y2 = y2 - signY * (distY * k3 < t.height / 2 ? distY * k3 : t.height / 2);
    return { x1, y1, x2, y2 };
  }
  drawNode(node) {
    switch (node.nodeType) {
      case nodeTypeEnum.PLACE: {
        this.drawCircle(
          node.x,
          node.y,
          node.radius,
          this.selected === node
            ? defaultSettings.selectStrokeStyle
            : defaultSettings.strokeStyle
        );
        break;
      }
      case nodeTypeEnum.TRANSITION: {
        this.drawRect(
          node.x,
          node.y,
          node.width,
          node.height,
          this.selected === node
            ? defaultSettings.selectStrokeStyle
            : defaultSettings.strokeStyle
        );
        break;
      }
    }
  }
  drawEdge(edge) {
    let nodeFrom = this.props.nodes[edge.nodeFrom];
    let nodeTo = this.props.nodes[edge.nodeTo];
    let edgePos = this.getEdgePos(nodeFrom, nodeTo);
    if (nodeFrom.nodeType === nodeTypeEnum.PLACE)
      this.drawArrow(
        edgePos.x1,
        edgePos.y1,
        edgePos.x2,
        edgePos.y2,
        this.selected === edge
          ? defaultSettings.selectStrokeStyle
          : defaultSettings.strokeStyle
      );
    else
      this.drawArrow(
        edgePos.x2,
        edgePos.y2,
        edgePos.x1,
        edgePos.y1,
        this.selected === edge
          ? defaultSettings.selectStrokeStyle
          : defaultSettings.strokeStyle
      );
  }
  drawCircle(x, y, radius, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    this.ctx.fillStyle = defaultSettings.fillStyle;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
  }
  drawRect(x, y, width, height, strokeStyle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = defaultSettings.fillStyle;
    this.ctx.rect(x - width / 2, y - height / 2, width, height);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.rect(x - width / 2, y - height / 2, width, height);
    this.ctx.stroke();
  }
  getMousePos(e) {
    return {
      x:
        e.clientX -
        this.container.parentElement.offsetLeft +
        this.container.scrollLeft,
      y:
        e.clientY -
        this.container.parentElement.offsetTop +
        this.container.scrollTop
    };
  }
  raiseError(msg) {
    const errorBox = document.getElementById("error-message");
    errorBox.innerText = msg;
    showElement(errorBox);
    setTimeout(() => {
      hideElement(errorBox);
    }, 1000);
  }
  fixDpi(canvas) {
    let dpi = window.devicePixelRatio;
    let style = {
      height() {
        return getComputedStyle(canvas)
          .getPropertyValue("height")
          .slice(0, -2);
      },
      width() {
        return getComputedStyle(canvas)
          .getPropertyValue("width")
          .slice(0, -2);
      }
    };
    canvas.setAttribute("width", style.width() * dpi);
    canvas.setAttribute("height", style.height() * dpi);
  }

  clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawGrid(canvas, ctx, gridNodeSize) {
    ctx.strokeStyle = "#E8E8E8";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i = i + gridNodeSize) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
    }
    for (let i = 0; i < canvas.width; i = i + gridNodeSize) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
    }
    ctx.stroke();
  }
  render() {
    console.log("Canvas rendered");
    return (
      <div id="tab-prod" className="tab">
        <div id="canvas-container">
          <canvas id="canvas-grid" />
          <canvas
            id="canvas"
            onMouseDown={this.onMouseDown.bind(this)}
            onMouseUp={this.onMouseUp.bind(this)}
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)}
          />
        </div>
        <div id="error-message" />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  const id = state.projects.selectedProjectId;
  if (!id) {
    return {
      isActive: false
    };
  }
  const project = state.projects.projects[id];
  const model = project.model;
  return {
    nodes: model.nodes,
    edges: model.edges,
    isActive: true,
    elementsOrder: model.elementsOrder,
    selected: model.selected
  };
};

export default connect(mapStateToProps, {
  createPlace,
  createTransition,
  deleteNode,
  renameNode,
  moveNode,
  createEdge,
  selectElement
})(Canvas);
