import React, { Component } from "react";
import { connect } from "react-redux";
import {
  renameSupplier,
  createSupplier,
  deleteSupplier
} from "../../actions/modelActions";

class TableSuppliers extends Component {
  constructor(props) {
    console.log("Constructor called");
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleCreateName = this.handleCreateName.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.state = {
      name: ""
    };
  }
  handleChangeName(e) {
    if (!this.props.isActive) return;
    console.log(e.target.parentElement.parentElement);
    console.log(e.target.value);
    this.props.renameSupplier({
      name: e.target.value,
      id: e.target.parentElement.parentElement.id
    });
  }
  handleCreateName(e) {
    if (!this.props.isActive) return;
    this.setState({ name: e.target.value });
  }
  handleCreateClick(e) {
    if (!this.props.isActive) return;
    console.log(this.state.name);
    this.props.createSupplier(this.state.name);
  }
  render() {
    console.log("suppliers rendered");
    const suppliersList = Object.values(this.props.suppliers).map(supplier => {
      return (
        <tr key={supplier.id} id={supplier.id}>
          <td>
            <input
              type="text"
              value={supplier.name}
              onChange={this.handleChangeName}
            />
          </td>
        </tr>
      );
    });
    return (
      <div>
        <input type="text" onChange={this.handleCreateName} />
        <button onClick={this.handleCreateClick}>+</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{suppliersList}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const id = state.projects.selectedProjectId;
  if (!id) {
    return {
      isActive: false,
      suppliers: {}
    };
  }
  const model = state.projects.projects[id].model;
  console.log(model);
  if (!model) {
    console.log("in");
    return {
      isActive: false,
      suppliers: {}
    };
  }
  return {
    suppliers: model.suppliers,
    isActive: true
  };
};

export default connect(mapStateToProps, {
  renameSupplier,
  createSupplier,
  deleteSupplier
})(TableSuppliers);
