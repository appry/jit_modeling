import { OPTIMISE } from "../actions/types";
import nodeTypeEnum from "../utils/nodeTypeEnum";
import { simplex } from "../optimisation/simplex";
import applySimplex from "../optimisation/applySimplex";
import { genetic, objective } from "../optimisation/genetic";
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPTIMISE: {
      let { model, count } = applySimplex(action.payload);
      let l = genetic(model, count, 10, 5);
      return { model, l };
    }
    default:
      return state;
  }
}
