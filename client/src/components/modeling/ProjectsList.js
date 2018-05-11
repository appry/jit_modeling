import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectsInfo } from "../../actions/projectsActions";
import { selectProject } from "../../actions/projectsActions";
import Spinner from "../common/Spinner";
import classnames from "classnames";

class ProjectsList extends Component {
  componentDidMount() {
    this.props.getProjectsInfo();
  }

  onClick(e) {
    const _id = e.target.id === "" ? e.target.parentElement.id : e.target.id;
    console.log(this.props);
    this.props.selectProject({ _id, model: this.props.projects[_id].model });
  }
  componentDidUpdate() {
    console.log(this.props);
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
    isSynced: project.isSynced,
    model: project.model
  }));
  console.log(props);
  return props;
};

export default connect(mapStateToProps, { getProjectsInfo, selectProject })(
  ProjectsList
);
