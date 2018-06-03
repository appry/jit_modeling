import React, { Component } from "react";
import { connect } from "react-redux";
import { optimise } from "../../actions/optimisationActions";
import OptimisationTable from "./OptimisationTable";

class Optimisation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.props.optimisation || !this.props.model) return;
    this.props.optimise(this.props.model);
    this.forceUpdate();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div>
        <button className="btn" onClick={this.handleClick}>
          Optimise
        </button>
        <OptimisationTable optimisation={this.props.optimisation} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const id = state.projects.selectedProjectId;
  if (!id) {
    return {
      optimisation: null,
      model: null
    };
  }
  return {
    optimisation: state.optimisation,
    model: state.projects.projects[id].model
  };
};

export default connect(mapStateToProps, { optimise })(Optimisation);
