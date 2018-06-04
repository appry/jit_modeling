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
            let time = this.props.optimisation.l[count++];
            rows.push(
              <tr
                style={{ background: time < 0 ? "#ff9191" : "#b5f28c" }}
                key={count}
              >
                <td>{t.name}</td>
                <td>{p.name}</td>
                <td>{el.supplier}</td>
                <td>{el.amount}</td>
                <td>{Math.abs(Math.round(time * 1e2) / 1e2)}</td>
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
