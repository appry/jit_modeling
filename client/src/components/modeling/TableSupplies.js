import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateSupply,
  deleteSupply,
  createSupply
} from "../../actions/modelActions";
import AddSupply from "./AddSupply";
import TableSuppliesRow from "./TableSuppliesRow";

class TableSupplies extends Component {
  render() {
    const suppliersValues = Object.values(this.props.suppliers);
    const productsValues = Object.values(this.props.products);
    const supplierOptions = suppliersValues.map(supplier => {
      return (
        <option key={supplier.id} value={supplier.id}>
          {supplier.name}
        </option>
      );
    });
    supplierOptions.unshift(
      <option disabled key="0" value="">
        ...
      </option>
    );
    const productOptions = productsValues.map(product => {
      return (
        <option key={product.id} value={product.id}>
          {product.name}
        </option>
      );
    });
    productOptions.unshift(
      <option disabled key="0" value="">
        ...
      </option>
    );
    const suppliesList = Object.values(this.props.supplies).map(supply => {
      return (
        <TableSuppliesRow
          key={supply.id}
          update={this.props.updateSupply}
          delete={this.props.deleteSupply}
          supply={supply}
          supplierOptions={supplierOptions}
          productOptions={productOptions}
        />
      );
    });
    return (
      <div>
        <table className="production-table">
          <thead>
            <tr>
              <th>Supplier</th>
              <th>Product</th>
              <th>Price</th>
              <th>Time</th>
              <th>Max</th>
              <th />
            </tr>
            <AddSupply
              create={this.props.createSupply}
              isActive={this.props.isActive}
              suppliersValues={suppliersValues}
              productsValues={productsValues}
              supplierOptions={supplierOptions}
              productOptions={productOptions}
            />
          </thead>
          <tbody>{suppliesList}</tbody>
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
      supplies: {},
      products: {},
      suppliers: {}
    };
  }
  const model = state.projects.projects[id].model;
  if (!model) {
    return {
      isActive: false,
      supplies: {},
      products: {},
      suppliers: {}
    };
  }
  return {
    supplies: model.supplies,
    suppliers: model.suppliers,
    products: model.products,
    isActive: true
  };
};

export default connect(mapStateToProps, {
  updateSupply,
  createSupply,
  deleteSupply
})(TableSupplies);
