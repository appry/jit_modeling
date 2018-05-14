import {
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
import projectStateEnum from "../utils/projectStateEnum";
import modelReducer from "./modelReducer";
import { Model } from "../modelClasses";
const initialState = {
  projects: {},
  selectedProjectId: null
};

export default function(state = initialState, action) {
  if (action.modelChanged) {
    console.log(`in modle chagne ${action.modelChanged}`);
    const _id = state.selectedProjectId;
    const project = state.projects[_id];
    const model = project.model;
    const newModel = modelReducer(model, action);
    if (model === undefined) return;
    return {
      ...state,
      projects: {
        ...state.projects,
        [_id]: {
          ...project,
          model: newModel,
          isSynced: projectStateEnum.NOT_SYNCED
        }
      }
    };
  }
  switch (action.type) {
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case PROJECT_SYNCING: {
      let project = state.projects[action.payload];
      project.isSynced = projectStateEnum.LOADING;
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project }
      };
    }
    case GET_PROJECT: {
      let project = { ...state.projects[action.payload._id] };
      project.isSynced = projectStateEnum.SYNCED;
      if (isEmpty(action.payload.model)) {
        project.model = new Model();
      } else {
        project.model = action.payload.model;
      }
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project },
        selectedProjectId: project._id,
        loading: false
      };
    }
    // case GET_PROJECTS:
    //   if (isEmpty(action.payload))
    //     return {
    //       ...state,
    //       loading: false
    //     };
    //   let projects = Object.map(action.payload, project => {
    //     let obj = { ...project };
    //     if (!isEmpty(project.model))
    //       obj.model = JSON.parse(project.jsonData);
    //     else obj.model = {};
    //     return {
    //       ...obj,
    //       isSynced: projectStateEnum.SYNCED
    //     };
    //   });
    //   return {
    //     ...state,
    //     loading: false,
    //     projects,
    //     selectedProjectId: action.payload[Object.keys(action.payload)[0]]._id
    //   };
    case GET_PROJECTS_INFO: {
      let projects = Object.map(action.payload, project => {
        project.isSynced = projectStateEnum.NOT_LOADED;
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
      project.model = new Model();
      project.isSynced = projectStateEnum.SYNCED;

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
      selectedProject.isSynced = projectStateEnum.NOT_SYNCED;
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
      project.isSynced = projectStateEnum.SYNCED;
      return {
        ...state,
        projects: { ...state.projects, [project._id]: project }
      };
    }
    case SYNC_ALL: {
      const projects = Object.map(action.payload, project => {
        if (project.isSynced !== projectStateEnum.NOT_LOADED)
          project.isSynced = projectStateEnum.SYNCED;
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
