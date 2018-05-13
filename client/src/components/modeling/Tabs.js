import React, { Component } from "react";
import Canvas from "./Canvas";
import openTab from "../../utils/openTab";

export default class Tabs extends Component {
  onClick(e) {
    openTab(e.target.dataset.tab, e.target);
  }
  render() {
    return (
      <div className="panel-center border">
        <div id="model-tabs">
          <button
            className="btn btn-secondary"
            data-tab="tab-prod"
            onClick={this.onClick.bind(this)}
          >
            Production
          </button>
          <button
            className="btn"
            data-tab="tab-supply"
            onClick={this.onClick.bind(this)}
          >
            Supply
          </button>
          <button
            className="btn"
            data-tab="tab-opt"
            onClick={this.onClick.bind(this)}
          >
            Optimisation
          </button>
        </div>
        <div id="tab-prod" className="tab">
          <Canvas />
          <div id="error-message" />
        </div>
        <div id="tab-supply" className="tab" style={{ display: "none" }} />
        <div id="tab-opt" className="tab" style={{ display: "none" }} />
      </div>
    );
  }
}
