import React, { Component } from "react";

import AddProject from "./AddProject";
import ProjectsList from "./ProjectsList";
import ManagerPanel from "./ManagerPanel";
import Tabs from "./Tabs";
import ButtonList from "./ButtonList";
import Toolbox from "./Toolbox";
import Editing from "./Editing";
import { connect } from "react-redux";

class ModelingPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="panel-top border">
          <ManagerPanel />
        </div>
        <div className="main-container border">
          <div className="panel-left border">
            <div className="projects-container border">
              <div className="projects-manager-container">
                <AddProject />
              </div>
              <div className="projects-list-container">
                <ProjectsList />
              </div>
            </div>
            <div className="toolbox-container border">
              <Toolbox />
            </div>
            <div className="controls-container border">
              <ButtonList />
            </div>
          </div>
          <Tabs />

          <div className="panel-right border">
            {this.props.isElementSelected && <Editing />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let props = {};
  const projectId = state.projects.selectedProjectId;
  if (!projectId) {
    props.isProjectSelected = false;
    return props;
  }
  props.isProjectSelected = true;
  const model = state.projects.projects[projectId].model;
  if (!model) {
    props.isModelPresent = false;
    return props;
  }
  props.isModelPresent = true;
  const selectedElementId = model.selected;
  if (!selectedElementId) {
    props.isElementSelected = false;
    return props;
  }
  props.isElementSelected = true;
  return props;
};

export default connect(mapStateToProps, {})(ModelingPage);
