import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  CREATE_PROJECT,
  SELECT_PROJECT
} from "../actions/types";

import isEmpty from "../validation/is-empty";

const initialState = {
  projects: [],
  selectedProjectId: null
};

export default function(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case PROJECTS_LOADING:
      console.log("PROJECTS_LOADING");
      return {
        ...state,
        loading: true
      };
    case GET_PROJECTS:
      console.log(action.payload);
      if (isEmpty(action.payload)) return state;
      return {
        ...state,
        loading: false,
        projects: action.payload.map(p => ({ ...p, isSynced: true })),
        selectedProjectId: action.payload[0]._id
      };
    case CREATE_PROJECT:
      console.log("CREATE_PROJECT");
      const project = action.payload;
      project.isSynced = true;
      return {
        ...state,
        projects: [...state.projects, project]
      };
    case SELECT_PROJECT:
      console.log("SELECT_PROJECT");
      return {
        ...state,
        selectedProjectId: action.payload
      };
    default:
      return state;
  }
}
