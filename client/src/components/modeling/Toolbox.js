import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteSelected,
  copySelected,
  toFront,
  toBack
} from "../../actions/modelActions";

class Toolbox extends Component {
  render() {
    return (
      <div className="toolbox-container">
        <button
          className="btn-toolbox"
          onClick={this.props.deleteSelected.bind(this)}
        >
          <span className="far fa-trash-alt" />
        </button>
        <button
          className="btn-toolbox"
          onClick={this.props.copySelected.bind(this)}
        >
          <span className="far fa-copy" />
        </button>
        <button className="btn-toolbox">
          <span className="fas fa-mouse-pointer" />
        </button>
        <button className="btn-toolbox" onClick={this.props.toFront.bind(this)}>
          <span className="fas fa-sort-amount-up" />
        </button>
        <button className="btn-toolbox" onClick={this.props.toBack.bind(this)}>
          <span className="fas fa-sort-amount-down" />
        </button>
      </div>
    );
  }
}

export default connect(null, { deleteSelected, copySelected, toFront, toBack })(
  Toolbox
);
