import React, { Component } from "react";
import classnames from "classnames";
import { validateElementProduct } from "../../validation/model";

export default class TableElementProductsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.elementProduct.product,
      amount: this.props.elementProduct.amount,
      id: this.props.elementProduct.id,
      errors: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentWillUnmount() {
    this.handleUpdate();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDelete(e) {
    this.props.delete({ id: this.state.id, elementId: this.props.elementId });
  }
  handleSelect(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.props.update({
      id: this.state.id,
      [e.target.name]: e.target.value,
      elementId: this.props.elementId
    });
  }
  handleUpdate(e) {
    const validation = validateElementProduct(this.state);
    if (validation.isValid) {
      this.setState({ errors: {} });
      this.props.update({ ...this.state, elementId: this.props.elementId });
    } else {
      this.setState({ errors: validation.errors });
    }
  }
  render() {
    return (
      <tr id={this.state.id}>
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
            "input-is-invalid": this.state.errors.amount
          })}
        >
          <input
            type="text"
            name="amount"
            value={this.state.amount}
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
