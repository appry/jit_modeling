import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProperties } from "../../actions/modelActions";
import PropertyGroup from "../common/PropertyGroup";
import EditPlace from "./EditPlace";
import EditTransition from "./EditTransition";
import EditEdge from "./EditEdge";
import NodeTypeEnum from "../../utils/nodeTypeEnum";

class Editing extends Component {
  render() {
    //if (!this.props.isActive) return <div />;
    let editor;
    let element = this.props.selectedElement;
    if (!element.nodeType) {
      editor = (
        <EditEdge
          element={element}
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
  // if (!id) {
  //   return {
  //     isActive: false
  //   };
  // }
  const model = state.projects.projects[id].model;
  // if (!model || !model.selected) {
  //   return {
  //     isActive: false
  //   };
  // }
  return {
    selectedElement: model.nodes[model.selected] || model.edges[model.selected]
  };
};

export default connect(mapStateToProps, { updateProperties })(Editing);
