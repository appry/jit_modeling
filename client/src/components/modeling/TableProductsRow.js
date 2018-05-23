import React, { Component } from "react";
import classnames from "classnames";
import { validateProduct } from "../../validation/model";

export default class TableProductsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name,
      storagePrice: this.props.product.storagePrice,
      id: this.props.product.id,
      errors: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.state.name === nextState.name &&
      this.state.storagePrice === nextState.storagePrice &&
      this.state.id === nextState.id &&
      this.state.errors === nextState.errors
    );
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDelete(e) {
    this.props.delete(this.state.id);
  }
  handleUpdate(e) {
    const validation = validateProduct(this.state);
    if (validation.isValid) {
      this.setState({ errors: {} });
      this.props.update(this.state);
    } else {
      this.setState({ errors: validation.errors });
    }
  }
  render() {
    console.log(`Row id=${this.state.id} rendered`);
    return (
      <tr id={this.state.id}>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.name
          })}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            onBlur={this.handleUpdate}
          />
        </td>
        <td
          className={classnames({
            "input-is-invalid": this.state.errors.storagePrice
          })}
        >
          <input
            type="text"
            name="storagePrice"
            value={this.state.storagePrice}
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
