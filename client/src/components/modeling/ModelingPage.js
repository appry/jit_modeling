import React, { Component } from "react";

import AddProject from "./AddProject";
import ProjectsList from "./ProjectsList";
import ManagerPanel from "./ManagerPanel";
import Tabs from "./Tabs";
import Controls from "./Controls";

class ModelingPage extends Component {
  render() {
    console.log("ModelingPage rendered");
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
            <div className="controls-container border">
              <Controls />
            </div>
          </div>
          <Tabs />

          <div className="panel-right border">Hi3</div>
        </div>
      </div>
    );
  }
}

export default ModelingPage;
