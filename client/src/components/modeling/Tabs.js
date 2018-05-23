import React, { Component } from "react";
import Canvas from "./Canvas";
import TableSuppliers from "./TableSuppliers";
import TableProducts from "./TableProducts";
import TableSupplies from "./TableSupplies";
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
        <Canvas />

        <div id="tab-supply" className="tab" style={{ display: "none" }}>
          <div className="tables-container">
            <div id="suppliers" className="border">
              <TableSuppliers />
            </div>
            <div id="products" className="border">
              <TableProducts />
            </div>
            <div id="supplies" className="border">
              <TableSupplies />
            </div>
          </div>
        </div>
        <div id="tab-opt" className="tab" style={{ display: "none" }} />
      </div>
    );
  }
}
