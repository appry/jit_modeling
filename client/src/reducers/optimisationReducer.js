import { OPTIMISE } from "../actions/types";
import nodeTypeEnum from "../utils/nodeTypeEnum";
import { simplex } from "../optimisation/simplex";
import { genetic } from "../optimisation/genetic";
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPTIMISE: {
      let model = JSON.parse(JSON.stringify(action.payload));

      // Create arrays from objects
      model.placesArr = [];
      model.transitionsArr = [];
      model.edgesArr = [];
      for (let key of Object.keys(model.nodes)) {
        let node = model.nodes[key];
        if (node.nodeType === nodeTypeEnum.PLACE) {
          model.placesArr.push(node);
        } else {
          node.productsArr = Object.values(node.products);
          model.transitionsArr.push(node);
        }
      }
      for (let key of Object.keys(model.edges)) {
        let edge = model.edges[key];
        edge.productsArr = Object.values(edge.products);
        model.edgesArr.push(edge);
      }
      model.suppliersArr = Object.values(model.suppliers);
      model.productsArr = Object.values(model.products);
      model.suppliesArr = Object.values(model.supplies);
      // ----
      let ans = [],
        count = 0;
      for (let t of model.transitionsArr) {
        if (t.productsArr.length === 0) continue;
        for (let pa of t.productsArr) {
          let p = model.products[pa.product];
          let c = [],
            k = [];
          k.push(pa.amount);
          for (let supply of model.suppliesArr) {
            if (p.id !== supply.product) {
              continue;
            }
            let cVal = supply.price + 1 / supply.lambda * p.storagePrice;
            c.push(cVal);
            k.push(supply.max);
          }
          let simplexRes = simplex(c, k);
          //-----
          let index = 0;
          pa.opt = [];
          for (let supply of model.suppliesArr) {
            if (p.id !== supply.product) {
              continue;
            }
            supply.max = supply.max - simplexRes.x[index];
            if (supply.max < 0) {
              supply.max = 0;
            }
            if (simplexRes.x[index] !== 0) {
              pa.opt.push({
                supplier: model.suppliers[supply.supplier].name,
                amount: simplexRes.x[index],
                supply
              });
              count++;
            }
            index++;
          }
        }
      }
      let l = genetic(model, count, 10, 5);
      console.log(l);
      return { model, l };
    }
    default:
      return state;
  }
}
