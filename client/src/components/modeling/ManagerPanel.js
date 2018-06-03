import React, { Component } from "react";
import {
  renameProject,
  deleteProject,
  sync,
  syncAll
} from "../../actions/projectsActions";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";

class ManagerPanel extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.name !== nextProps.name) return true;
    return false;
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  onClick(e) {
    if (isEmpty(this.props.selectedProjectId) || isEmpty(this.state.name))
      return;
    const name = this.state.name;

    this.props.renameProject(name, this.props.selectedProjectId);
  }

  handleDelete() {
    this.props.deleteProject(this.props.selectedProjectId);
  }

  handleSync() {
    this.props.sync(this.props.projects[this.props.selectedProjectId]);
  }

  handleSyncAll() {
    this.props.syncAll(this.props.projects);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          className="form-control mx-1 mt-1"
          style={{ width: "150px", display: "inline-block" }}
          onChange={this.onChange.bind(this)}
        />
        <button
          className="btn btn-secondary mx-1 mt-1"
          onClick={this.onClick.bind(this)}
        >
          Rename
        </button>
        <button
          className="btn btn-secondary mx-1 mt-1"
          onClick={this.handleSync.bind(this)}
        >
          Sync
          <span className="fas fa-upload ml-1" />
        </button>
        <button
          className="btn btn-secondary mx-1 mt-1"
          onClick={this.handleSyncAll.bind(this)}
        >
          Sync all
          <span className="fas fa-cloud-upload-alt ml-1" />
        </button>
        <button
          className="btn btn-secondary mx-1 mt-1"
          onClick={this.handleDelete.bind(this)}
        >
          Delete
          <span className="fas fa-trash-alt ml-1" />
        </button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    projects: state.projects.projects,
    selectedProjectId: state.projects.selectedProjectId,
    name: state.projects.selectedProjectId
      ? state.projects.projects[state.projects.selectedProjectId].name
      : ""
  };
};

export default connect(mapStateToProps, {
  renameProject,
  deleteProject,
  sync,
  syncAll
})(ManagerPanel);
