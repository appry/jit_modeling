import React, { Component } from "react";
import { connect } from "react-redux";

import AddElementProduct from "./AddElementProduct";
import TableElementProductsRow from "./TableElementProductsRow";

export default class TableElementProducts extends Component {
  render() {
    console.log("node product rendered");
    const productsValues = Object.values(this.props.products);
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
    const list = Object.values(this.props.elementProducts).map(
      elementProduct => {
        return (
          <TableElementProductsRow
            key={elementProduct.id}
            update={this.props.update}
            delete={this.props.delete}
            elementProduct={elementProduct}
            productOptions={productOptions}
          />
        );
      }
    );
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Amount</th>
              <th />
            </tr>
            <AddElementProduct
              create={this.props.createSupply}
              productsValues={productsValues}
              productOptions={productOptions}
            />
          </thead>
          <tbody>{list}</tbody>
        </table>
      </div>
    );
  }
}
