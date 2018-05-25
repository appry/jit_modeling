import React, { Component } from "react";
import PropertyGroup from "../common/PropertyGroup";
import TableElementProducts from "./TableElementProducts";

export default class EditPlace extends Component {
  state = {
    name: this.props.element.name,
    time: this.props.element.time,
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
    if (
      nextProps.id !== prevState.id ||
      nextProps.name !== prevState.name ||
      nextProps.time !== prevState.time
    ) {
      return {
        name: nextProps.element.name,
        time: nextProps.element.time,
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
      <div>
        <PropertyGroup
          label="Name"
          value={this.state.name}
          name="name"
          error=""
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
        <PropertyGroup
          label="Time"
          value={this.state.time}
          name="time"
          error=""
          onChange={this.onChange.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
        <TableElementProducts
          update={this.props.update}
          create={this.props.create}
          delete={this.props.delete}
          products={this.props.products}
          elementId={this.props.element.id}
          elementProducts={this.props.elementProducts}
        />
      </div>
    );
  }
}
