import React, { Component } from "react";
import buttonsEnum from "../../utils/buttonsEnum";
import { selectButton } from "../../actions/controlsActions";
import { connect } from "react-redux";
import classnames from "classnames";

class ButtonList extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.props.selectButton(e.target.dataset.control);
  }
  render() {
    return (
      <div>
        <ul className="list-group">
          <li
            className={classnames("list-group-item", {
              active: this.props.button === buttonsEnum.PLACE
            })}
            data-control={buttonsEnum.PLACE}
            onClick={this.onClick}
          >
            Place
          </li>
          <li
            className={classnames("list-group-item", {
              active: this.props.button === buttonsEnum.TRANSITION
            })}
            data-control={buttonsEnum.TRANSITION}
            onClick={this.onClick}
          >
            Transition
          </li>
          <li
            className={classnames("list-group-item", {
              active: this.props.button === buttonsEnum.EDGE
            })}
            data-control={buttonsEnum.EDGE}
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
    button: state.controls.button
  };
};

export default connect(mapStateToProps, { selectButton })(ButtonList);
