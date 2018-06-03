import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectsActions";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  onChange(e) {
    this.setState({ name: e.target.value });
  }

  onButtonClick(e) {
    if (this.state.name) {
      const name = this.state.name;
      this.setState({ name: "" });
      this.props.createProject(name);
    }
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={this.state.name}
          onChange={this.onChange.bind(this)}
          placeholder="New project"
        />
        <div className="input-group-append">
          <button className="btn" onClick={this.onButtonClick.bind(this)}>
            <i className="fas fa-plus-square  " />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { createProject })(AddProject);
