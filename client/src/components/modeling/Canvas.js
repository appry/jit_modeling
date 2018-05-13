import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../store";
import controlsEnum from "../../utils/controlsEnum";
import { Place, Transition, Edge, Product } from "../../modelClasses";

class Canvas extends Component {
  componentDidMount() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasGrid = document.getElementById("canvas-grid");
    this.ctxGrid = this.canvasGrid.getContext("2d");
    this.container = document.getElementById("canvas-container");
    this.fixDpi(this.canvas);
    this.fixDpi(this.canvasGrid);
    this.drawGrid(
      this.canvasGrid,
      this.ctxGrid,
      this.props.settings.gridNodeSize
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isActive) return;
    for (let node of this.props.nodes) {
    }
  }
  onMouseDown(e) {
    console.log(this.getMousePos(e));
    switch (store.controls.select) {
      case controlsEnum.PLACE: {
      }
    }
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
      settings: state.settings
    };
  }
  const project = state.projects.projects[id];
  const model = project.model;
  return {
    nodes: model.nodes,
    edges: model.edges,
    settings: state.settings,
    isActive: true
  };
};

export default connect(mapStateToProps, {})(Canvas);
