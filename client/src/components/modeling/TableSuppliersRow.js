import React, { Component } from "react";
import classnames from "classnames";
import { validateSupplier } from "../../validation/model";

export default class TableSuppliersRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.supplier.name,
      id: this.props.supplier.id,
      errors: {}
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.state.name === nextState.name &&
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
    const validation = validateSupplier(this.state);
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
        <td onClick={this.handleDelete}>
          <span className="fas fa-trash-alt" />
        </td>
      </tr>
    );
  }
}
