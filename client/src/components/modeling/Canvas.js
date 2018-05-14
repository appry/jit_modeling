import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";
import buttonsEnum from "../../utils/buttonsEnum";
import { Place, Transition, Edge, Product } from "../../modelClasses";
import {
  createPlace,
  createTransition,
  deleteNode,
  renameNode,
  moveNode
} from "../../actions/modelActions";
import { selectElement } from "../../actions/controlsActions";
import nodeTypeEnum from "../../utils/nodeTypeEnum";
import defaultSettings from "../../config/defaultSettings";

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
  componentDidUpdate(prevProps, prevState) {
    this.update();
  }
  update() {
    this.clearCanvas(this.canvas, this.ctx);
    if (!this.props.isActive) return;
    for (let key of Object.keys(this.props.nodes)) {
      let node = this.props.nodes[key];
      this.drawNode(node);
    }
    for (let key of Object.keys(this.props.edges)) {
    }
  }
  onMouseDown(e) {
    if (!this.props.isActive) return;
    const mousePos = this.getMousePos(e);
    const storeState = store.getState();
    switch (storeState.controls.button) {
      case buttonsEnum.PLACE: {
        this.props.createPlace(mousePos);
        break;
      }
      case buttonsEnum.TRANSITION: {
        this.props.createTransition(mousePos);
        break;
      }
      default: {
        console.log("click");
        let element = this.findElementByPos(mousePos.x, mousePos.y);
        if (element) {
          console.log("found");
          this.props.selectElement(element.id);
        } else {
        }
      }
    }
  }
  findElementByPos(x, y) {
    let selected;
    for (let key of Object.keys(this.props.nodes)) {
      let node = this.props.nodes[key];
      if (this.checkNodeClick(x, y, node)) {
        selected = node;
        break;
      }
    }
    if (!selected)
      for (let key of Object.keys(this.props.edges)) {
        let edge = this.props.edges[key];
        if (this.checkEdgeClick(x, y, edge)) {
          selected = edge;
          break;
        }
      }
    return selected;
  }
  checkEdgeClick(x, y, edge) {
    return false;
  }
  checkNodeClick(x, y, node) {
    switch (node.nodeType) {
      case nodeTypeEnum.PLACE: {
        console.log("place");
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
    console.log(x, y, obj);
    return (
      x > obj.x - obj.width / 2 &&
      x < obj.x + obj.width / 2 &&
      y > obj.y - obj.height / 2 &&
      y < obj.y + obj.height / 2
    );
  }
  selectNode(node) {}
  drawNode(node) {
    switch (node.nodeType) {
      case nodeTypeEnum.PLACE: {
        this.drawCircle(
          node.x,
          node.y,
          defaultSettings.radius,
          defaultSettings.strokeStyle
        );
        break;
      }
      case nodeTypeEnum.TRANSITION: {
        this.drawRect(
          node.x,
          node.y,
          defaultSettings.width,
          defaultSettings.height,
          defaultSettings.strokeStyle
        );
        break;
      }
    }
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
      <div id="canvas-container">
        <canvas id="canvas-grid" />
        <canvas id="canvas" onMouseDown={this.onMouseDown.bind(this)} />
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  const id = state.projects.selectedProjectId;
  if (!id) {
    return {
      isActive: false,
      selectedElement: state.controls.element
    };
  }
  const project = state.projects.projects[id];
  const model = project.model;
  return {
    nodes: model.nodes,
    edges: model.edges,
    isActive: true
  };
};

export default connect(mapStateToProps, {
  createPlace,
  createTransition,
  deleteNode,
  renameNode,
  moveNode,
  selectElement
})(Canvas);
