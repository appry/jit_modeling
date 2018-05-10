import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjects } from "../../actions/projectsActions";
import { selectProject } from "../../actions/projectsActions";
import Spinner from "../common/Spinner";
import classnames from "classnames";

class ProjectsList extends Component {
  componentDidMount() {
    this.props.getProjects();
  }

  onClick(e) {
    const id = e.target.id === "" ? e.target.parentElement.id : e.target.id;
    this.props.selectProject(id);
  }

  render() {
    console.log("ProjectsList rendered");
    if (this.props.loading) return <Spinner />;
    const listItems = Object.values(this.props.projects).map(p => (
      <li key={p._id} className="list-group-item">
        <button
          id={p._id}
          className={classnames(
            "btn project-list-item text-truncate text-left",
            {
              "btn-primary": p._id === this.props.selectedProjectId
            }
          )}
          onClick={this.onClick.bind(this)}
        >
          <span
            className={classnames("icon-sync", {
              "fas fa-check-circle": p.isSynced === "s",
              "fas fa-exclamation-circle": p.isSynced === "n",
              "fas fa-spinner fa-spin": p.isSynced === "l"
            })}
          />
          {p.name}
        </button>
      </li>
    ));
    return (
      <div>
        <ul className="list-group">{listItems}</ul>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  let props = {
    selectedProjectId: state.projects.selectedProjectId,
    loading: state.projects.loading
  };
  props.projects = Object.map(state.projects.projects, project => ({
    _id: project._id,
    name: project.name,
    isSynced: project.isSynced
  }));
  return props;
};

export default connect(mapStateToProps, { getProjects, selectProject })(
  ProjectsList
);
