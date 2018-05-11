import React, { Component } from "react";
import controlsEnum from "../../utils/controlsEnum";
import { setControl } from "../../actions/controlsActions";
import { connect } from "react-redux";
import classnames from "classnames";

class Controls extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.props.setControl(e.target.dataset.control);
  }
  render() {
    return (
      <div>
        <ul className="list-group">
          <li
            className={classnames("list-group-item", {
              active: this.props.selected === controlsEnum.PLACE
            })}
            data-control={controlsEnum.PLACE}
            onClick={this.onClick}
          >
            Place
          </li>
          <li
            className={classnames("list-group-item", {
              active: this.props.selected === controlsEnum.TRANSITION
            })}
            data-control={controlsEnum.TRANSITION}
            onClick={this.onClick}
          >
            Transition
          </li>
          <li
            className={classnames("list-group-item", {
              active: this.props.selected === controlsEnum.EDGE
            })}
            data-control={controlsEnum.EDGE}
            onClick={this.onClick}
          >
            Edge
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    selected: state.controls.selected
  };
};

export default connect(mapStateToProps, { setControl })(Controls);
