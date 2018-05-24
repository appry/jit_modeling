import React, { Component } from "react";
import PropertyGroup from "../common/PropertyGroup";

export default class EditEdge extends Component {
  state = {
    name: this.props.element.name,
    id: this.props.element.id
  };
  componentWillUnmount() {
    this.onBlur();
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onBlur(e) {
    this.props.updateProperties(this.state);
  }
  render() {
    return (
      <PropertyGroup
        label="Name"
        value={this.state.name}
        name="name"
        error=""
        onChange={this.onChange.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    );
  }
}
