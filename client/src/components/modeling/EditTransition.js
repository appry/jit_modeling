import React, { Component } from "react";
import PropertyGroup from "../common/PropertyGroup";
import CheckBoxGroup from "../common/CheckBoxGroup";
import TableElementProducts from "./TableElementProducts";

export default class EditPlace extends Component {
  state = {
    name: this.props.element.name,
    time: this.props.element.time,
    id: this.props.element.id,
    fee: this.props.element.fee,
    storagePrice: this.props.element.storagePrice,
    isFinal: this.props.element.isFinal
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
      nextProps.time !== prevState.time ||
      nextProps.fee !== prevState.fee ||
      nextProps.storagePrice !== prevState.storagePrice ||
      nextProps.isFinal !== prevState.isFinal
    ) {
      return {
        name: nextProps.element.name,
        time: nextProps.element.time,
        id: nextProps.element.id,
        fee: nextProps.element.fee,
        storagePrice: nextProps.element.storagePrice,
        isFinal: nextProps.element.isFinal
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
  onCheckboxClick(e) {
    //this.setState({ isFinal: e.target.checked });
    this.props.updateProperties({ ...this.state, isFinal: e.target.checked });
  }

  render() {
    let disabled = this.props.element.outputs.length !== 0;
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
        <CheckBoxGroup
          label="IsFinal"
          name="isFinal"
          onChange={this.onCheckboxClick.bind(this)}
          checked={this.state.isFinal}
          disabled={disabled}
        />
        {this.state.isFinal && (
          <React.Fragment>
            <PropertyGroup
              label="Fee"
              value={this.state.fee}
              name="fee"
              error=""
              onChange={this.onChange.bind(this)}
              onBlur={this.onBlur.bind(this)}
            />
            <PropertyGroup
              label="StoragePrice"
              value={this.state.storagePrice}
              name="storagePrice"
              error=""
              onChange={this.onChange.bind(this)}
              onBlur={this.onBlur.bind(this)}
            />
          </React.Fragment>
        )}
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
