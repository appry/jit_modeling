import React, { Component } from "react";
import classnames from "classnames";
import { validateElementProduct } from "../../validation/model";

export default class AddSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      amount: "",
      errors: {}
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let prodFound = false;
    for (let product of nextProps.productsValues) {
      if (product.id === prevState.product) {
        prodFound = true;
        break;
      }
    }
    if (!prodFound) {
      return { product: "" };
    }
    return null;
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreate(e) {
    const validation = validateElementProduct(this.state);
    if (validation.isValid) {
      this.setState({ errors: {} });
      console.log({ ...this.state, elementId: this.props.elementId });
      this.props.create({ ...this.state, elementId: this.props.elementId });
    } else {
      this.setState({ errors: validation.errors });
    }
  }

  render() {
    return (
      <tr id={this.state.id}>
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
            "input-is-invalid": this.state.errors.amount
          })}
        >
          <input
            type="text"
            name="amount"
            value={this.state.amount}
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
