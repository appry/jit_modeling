import React, { Component } from "react";
import classnames from "classnames";
import { validateSupply } from "../../validation/model";

export default class TableSuppliesRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: this.props.supply.supplier,
      product: this.props.supply.product,
      price: this.props.supply.price,
      time: this.props.supply.time,
      max: this.props.supply.max,
      id: this.props.supply.id,
      errors: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  //   shouldComponentUpdate(nextProps, nextState) {
  //     return !(
  //       this.state.name === nextState.name &&
  //       this.state.id === nextState.id &&
  //       this.state.errors === nextState.errors
  //     );
  //   }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDelete(e) {
    this.props.delete(this.state.id);
  }
  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.update({ id: this.state.id, [e.target.name]: e.target.value });
  }
  handleUpdate(e) {
    const validation = validateSupply(this.state);
    if (validation.isValid) {
      this.setState({ errors: {} });
      this.props.update(this.state);
    } else {
      this.setState({ errors: validation.errors });
    }
  }
  render() {
    return (
      <tr id={this.state.id}>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.supplier
          })}
        >
          <select
            name="supplier"
            value={this.state.supplier}
            onChange={this.handleSelect}
          >
            {this.props.supplierOptions}
          </select>
        </td>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.product
          })}
        >
          <select
            name="product"
            value={this.state.product}
            onChange={this.handleSelect}
          >
            {this.props.productOptions}
          </select>
        </td>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.price
          })}
        >
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
            onBlur={this.handleUpdate}
          />
        </td>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.time
          })}
        >
          <input
            type="text"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
            onBlur={this.handleUpdate}
          />
        </td>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.max
          })}
        >
          <input
            type="text"
            name="max"
            value={this.state.max}
            onChange={this.handleChange}
            onBlur={this.handleUpdate}
          />
        </td>
        <td onClick={this.handleDelete}>
          <span className="fas fa-trash-alt" />
        </td>
      </tr>
    );
  }
}
