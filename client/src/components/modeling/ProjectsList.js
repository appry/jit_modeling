import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjectsInfo } from "../../actions/projectsActions";
import { selectProject } from "../../actions/projectsActions";
import Spinner from "../common/Spinner";
import classnames from "classnames";
import projectStateEnum from "../../utils/projectStateEnum";

class ProjectsList extends Component {
  componentDidMount() {
    this.props.getProjectsInfo();
  }

  onClick(e) {
    const _id = e.target.id === "" ? e.target.parentElement.id : e.target.id;
    this.props.selectProject({
      _id,
      isSynced: this.props.projects[_id].isSynced
    });
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
              "fas fa-check-circle": p.isSynced === projectStateEnum.SYNCED,
              "fas fa-exclamation-circle":
                p.isSynced === projectStateEnum.NOT_SYNCED,
              "fas fa-spinner fa-spin": p.isSynced === projectStateEnum.LOADING,
              "fas fa-download": p.isSynced === projectStateEnum.NOT_LOADED
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

export default connect(mapStateToProps, { getProjectsInfo, selectProject })(
  ProjectsList
);
