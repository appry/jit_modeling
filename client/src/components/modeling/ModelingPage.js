import React, { Component } from "react";

import ManageProjects from "./ManageProjects";
import ProjectsList from "./ProjectsList";

class ModelingPage extends Component {
  render() {
    console.log("ModelingPage rendered");
    return (
      <div className="container">
        <div className="panel-top border"> Hi4</div>
        <div className="main-container border">
          <div className="panel-left border">
            <div className="projects-container border">
              <div className="projects-manager-container">
                <ManageProjects />
              </div>
              <div className="projects-list-container">
                <ProjectsList />
              </div>
            </div>
            <div className="controls-container border">Lorem</div>
          </div>
          <div className="panel-center border">Lorem</div>
          <div className="panel-right border">Hi3</div>
        </div>
      </div>
    );
  }
}

export default ModelingPage;
