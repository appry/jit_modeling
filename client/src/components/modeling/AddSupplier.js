import React, { Component } from "react";
import classnames from "classnames";
import { validateSupplier } from "../../validation/model";

export default class AddSupplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      errors: {}
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleCreate(e) {
    const validation = validateSupplier(this.state);
    if (validation.isValid) {
      this.setState({ errors: {} });
      this.props.create(this.state);
    } else {
      this.setState({ errors: validation.errors });
    }
  }

  render() {
    return (
      <tr>
        <th
          className={classnames({
            "input-is-invalid": this.state.errors.name
          })}
        >
          <input
            type="text"
            name="name"
            value={this.state.name}
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
