import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateSupplier,
  deleteSupplier,
  createSupplier
} from "../../actions/modelActions";
import AddSupplier from "./AddSupplier";
import TableSuppliersRow from "./TableSuppliersRow";

class TableSuppliers extends Component {
  render() {
    const suppliersList = Object.values(this.props.suppliers).map(supplier => {
      return (
        <TableSuppliersRow
          key={supplier.id}
          update={this.props.updateSupplier}
          delete={this.props.deleteSupplier}
          supplier={supplier}
        />
      );
    });
    return (
      <div>
        <table className="production-table">
          <thead>
            <tr>
              <th>Name</th>
              <th />
            </tr>
            <AddSupplier
              create={this.props.createSupplier}
              isActive={this.props.isActive}
            />
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
  if (!model) {
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
  updateSupplier,
  createSupplier,
  deleteSupplier
})(TableSuppliers);
