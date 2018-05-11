import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  CREATE_PROJECT,
  SELECT_PROJECT,
  RENAME_PROJECT,
  DELETE_PROJECT,
  SYNC,
  SYNC_ALL,
  PROJECT_SYNCING,
  GET_PROJECT,
  GET_PROJECTS_INFO
} from "../actions/types";

import isEmpty from "../validation/is-empty";

const initialState = {
  projects: {},
  selectedProjectId: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case PROJECT_SYNCING: {
      let project = action.payload;
      project.isSynced = "l";
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project }
      };
    }
    case GET_PROJECT: {
      let project = { ...state.projects[action.payload._id] };
      project.isSynced = "s";

      delete project.jsonData;
      if (isEmpty(action.payload.jsonData)) {
        project.model = {};
        return {
          ...state,
          projects: { ...state.projects, [project._id]: project },
          selectedProjectId: project._id,
          loading: false
        };
      }

      project.model = JSON.parse(action.payload.jsonData);
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project },
        loading: false
      };
    }
    case GET_PROJECTS:
      if (isEmpty(action.payload))
        return {
          ...state,
          loading: false
        };
      let projects = Object.map(action.payload, project => {
        let obj = { ...project };
        if (!isEmpty(project.jsonData))
          obj.model = JSON.parse(project.jsonData);
        else obj.model = {};
        delete obj.jsonData;
        return {
          ...obj,
          isSynced: "s"
        };
      });
      return {
        ...state,
        loading: false,
        projects,
        selectedProjectId: action.payload[Object.keys(action.payload)[0]]._id
      };
    case GET_PROJECTS_INFO: {
      let projects = Object.map(action.payload, project => {
        project.isSynced = "n";
        return project;
      });
      return {
        ...state,
        loading: false,
        projects
      };
    }

    case CREATE_PROJECT:
      const project = action.payload;
      project.isSynced = "s";
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project }
      };
    case SELECT_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload
      };
    case RENAME_PROJECT:
      const { _id, name } = action.payload;
      const selectedProject = Object.assign({}, state.projects[_id]);
      selectedProject.name = name;
      selectedProject.isSynced = "n";
      return {
        ...state,
        projects: { ...state.projects, [_id]: selectedProject }
      };
    case DELETE_PROJECT: {
      let projects = Object.assign({}, state.projects);
      delete projects[action.payload];
      if (state.selectedProjectId === action.payload)
        state.selectedProjectId = null;
      return {
        ...state,
        projects
      };
    }
    case SYNC: {
      const project = action.payload;
      project.isSynced = "s";
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project }
      };
    }
    case SYNC_ALL: {
      const projects = Object.map(action.payload, project => {
        project.isSynced = "s";
        return project;
      });
      return {
        ...state,
        projects
      };
    }
    default:
      return state;
  }
}
