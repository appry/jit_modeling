import React, { Component } from "react";

import AddProject from "./AddProject";
import ProjectsList from "./ProjectsList";
import ManagerPanel from "./ManagerPanel";
import Tabs from "../common/Tabs";

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
            <div className="controls-container border">Lorem</div>
          </div>
          <div className="panel-center border">
            <Tabs />
          </div>
          <div className="panel-right border">Hi3</div>
        </div>
      </div>
    );
  }
}

export default ModelingPage;
