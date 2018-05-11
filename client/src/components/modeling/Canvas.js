import React, { Component } from "react";

class Canvas extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div id="canvas-container">
        <canvas id="canvas-grid" />
        <canvas id="canvas" />
      </div>
    );
  }
}

export default Canvas;
