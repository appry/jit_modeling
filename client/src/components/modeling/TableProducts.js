import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateProduct,
  deleteProduct,
  createProduct
} from "../../actions/modelActions";
import AddProduct from "./AddProduct";
import TableProductsRow from "./TableProductsRow";

class TableProducts extends Component {
  render() {
    const productsList = Object.values(this.props.products).map(product => {
      return (
        <TableProductsRow
          key={product.id}
          update={this.props.updateProduct}
          delete={this.props.deleteProduct}
          product={product}
        />
      );
    });
    return (
      <div>
        <table className="production-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Storage price</th>
              <th />
            </tr>
            <AddProduct
              create={this.props.createProduct}
              isActive={this.props.isActive}
            />
          </thead>
          <tbody>{productsList}</tbody>
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
      products: {}
    };
  }
  const model = state.projects.projects[id].model;
  if (!model) {
    return {
      isActive: false,
      products: {}
    };
  }
  return {
    products: model.products,
    isActive: true
  };
};

export default connect(mapStateToProps, {
  updateProduct,
  createProduct,
  deleteProduct
})(TableProducts);
