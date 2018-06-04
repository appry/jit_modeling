import React, { Component } from "react";
import { connect } from "react-redux";
import { optimise } from "../../actions/optimisationActions";
import applySimplex from "../../optimisation/applySimplex";
import { objective } from "../../optimisation/genetic";

import OptimisationTable from "./OptimisationTable";

class Optimisation extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (!this.props.optimisation || !this.props.model) return;
    // let { model } = applySimplex(this.props.model);
    // console.log(model);
    // let count = 0;
    // let taus = [-10, 0];
    // for (let transition of model.transitionsArr) {
    //   let maxTau = -Number.MAX_VALUE;
    //   for (let pa of transition.productsArr) {
    //     for (let opt of pa.opt) {
    //       opt.tau = taus[count++];
    //       if (opt.tau > maxTau) maxTau = opt.tau;
    //     }
    //   }
    //   transition.tau = maxTau;
    // }
    // console.log(objective(model));
    this.props.optimise(this.props.model);
    this.forceUpdate();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
  render() {
    return (
      <div>
        <button
          className="btn btn-success"
          style={{ margin: "5px" }}
          onClick={this.handleClick}
        >
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
