import React, { Component } from "react";

export default class OptimisationTable extends Component {
  render() {
    let rows = [];
    try {
      let count = 0;
      for (let t of this.props.optimisation.model.transitionsArr) {
        for (let pa of t.productsArr) {
          let p = this.props.optimisation.model.products[pa.product];
          for (let el of pa.opt) {
            rows.push(
              <tr key={count}>
                <td>{t.name}</td>
                <td>{p.name}</td>
                <td>{el.supplier}</td>
                <td>{el.amount}</td>
                <td>{this.props.optimisation.l[count++]}</td>
              </tr>
            );
          }
        }
      }
    } catch (error) {
      console.log(error);
      rows = [];
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Transition</th>
            <th>Product</th>
            <th>Supplier</th>
            <th>Amount</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
