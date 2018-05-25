import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateProperties,
  updateElementProduct,
  deleteElementProduct,
  createElementProduct
} from "../../actions/modelActions";
import PropertyGroup from "../common/PropertyGroup";
import EditPlace from "./EditPlace";
import EditTransition from "./EditTransition";
import EditEdge from "./EditEdge";
import NodeTypeEnum from "../../utils/nodeTypeEnum";

class Editing extends Component {
  render() {
    let editor;
    let element = this.props.selectedElement;
    if (!element.nodeType) {
      editor = (
        <EditEdge
          element={element}
          update={this.props.updateElementProduct}
          create={this.props.createElementProduct}
          delete={this.props.deleteElementProduct}
          products={this.props.products}
          elementProducts={this.props.selectedElement.products}
          updateProperties={this.props.updateProperties}
        />
      );
    } else {
      if (element.nodeType === NodeTypeEnum.PLACE) {
        editor = (
          <EditPlace
            element={element}
            updateProperties={this.props.updateProperties}
          />
        );
      } else {
        editor = (
          <EditTransition
            element={element}
            update={this.props.updateElementProduct}
            create={this.props.createElementProduct}
            delete={this.props.deleteElementProduct}
            products={this.props.products}
            elementProducts={this.props.selectedElement.products}
            updateProperties={this.props.updateProperties}
          />
        );
      }
    }
    return <div>{editor}</div>;
  }
}

const mapStateToProps = state => {
  const id = state.projects.selectedProjectId;
  const model = state.projects.projects[id].model;
  return {
    selectedElement: model.nodes[model.selected] || model.edges[model.selected],
    products: model.products
  };
};

export default connect(mapStateToProps, {
  updateProperties,
  updateElementProduct,
  deleteElementProduct,
  createElementProduct
})(Editing);
