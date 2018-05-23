import React, { Component } from "react";
import classnames from "classnames";
import { validateSupply } from "../../validation/model";

export default class AddSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: "",
      product: "",
      price: "",
      time: "",
      max: "",
      errors: {}
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreate(e) {
    const validation = validateSupply(this.state);
    if (validation.isValid) {
      this.setState({ errors: {} });
      this.props.create(this.state);
    } else {
      this.setState({ errors: validation.errors });
    }
  }

  render() {
    return (
      <tr id={this.state.id}>
        <th
          className={classnames({
            "input-is-invalid": this.state.errors.supplier
          })}
        >
          <select
            name="supplier"
            value={this.state.supplier}
            onChange={this.handleChange}
          >
            {this.props.supplierOptions}
          </select>
        </th>
        <th
          className={classnames({
            "input-is-invalid": this.state.errors.product
          })}
        >
          <select
            name="product"
            value={this.state.product}
            onChange={this.handleChange}
          >
            {this.props.productOptions}
          </select>
        </th>
        <th
          className={classnames({
            "input-is-invalid": this.state.errors.price
          })}
        >
          <input
            type="text"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
        </th>
        <th
          className={classnames({
            "input-is-invalid": this.state.errors.time
          })}
        >
          <input
            type="text"
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
          />
        </th>
        <th
          className={classnames({
            "input-is-invalid": this.state.errors.max
          })}
        >
          <input
            type="text"
            name="max"
            value={this.state.max}
            onChange={this.handleChange}
          />
        </th>
        <th onClick={this.handleCreate}>
          <span className="fas fa-plus-circle" />
        </th>
      </tr>
    );
  }
}
