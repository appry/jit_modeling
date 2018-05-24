import React, { Component } from "react";
import PropertyGroup from "../common/PropertyGroup";

export default class EditPlace extends Component {
  state = {
    name: this.props.element.name,
    id: this.props.element.id
  };
  componentWillUnmount() {
    this.onBlur();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.element.id !== prevProps.element.id) {
      this.props.updateProperties(prevState);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.id !== prevState.id || nextProps.name !== prevState.name) {
      return {
        name: nextProps.element.name,
        id: nextProps.element.id
      };
    }
    return null;
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
