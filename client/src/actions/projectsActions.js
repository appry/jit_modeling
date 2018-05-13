import axios from "axios";

import {
  GET_PROJECTS,
  GET_PROJECTS_INFO,
  GET_PROJECT,
  PROJECTS_LOADING,
  CREATE_PROJECT,
  SELECT_PROJECT,
  RENAME_PROJECT,
  DELETE_PROJECT,
  SYNC,
  SYNC_ALL,
  PROJECT_SYNCING
} from "./types";
import projectStateEnum from "../utils/projectStateEnum";
import isEmpty from "../validation/is-empty";

//Get project by id
export const getProject = _id => dispatch => {
  dispatch(setProjectSyncing(_id));
  axios
    .get(`api/projects/${_id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT,
        payload: { model: res.data, _id }
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROJECT,
        payload: {}
      });
    });
};

//Get all project infos
export const getProjectsInfo = () => dispatch => {
  dispatch(setProjectsLoading());
  axios
    .get("api/projects/info")
    .then(res => {
      dispatch({
        type: GET_PROJECTS_INFO,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROJECTS_INFO,
        payload: {}
      });
    });
};

//Get all user projects
export const getProjects = () => dispatch => {
  dispatch(setProjectsLoading());
  axios
    .get("api/projects")
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROJECTS,
        payload: {}
      });
    });
};

//Create new empty project
export const createProject = name => dispatch => {
  axios.post("api/projects", { name }).then(res => {
    dispatch({
      type: CREATE_PROJECT,
      payload: res.data
    });
  });
};

//Select project
export const selectProject = data => dispatch => {
  if (data.isSynced === projectStateEnum.NOT_LOADED) {
    dispatch(getProject(data._id));
  } else
    dispatch({
      type: SELECT_PROJECT,
      payload: data._id
    });
};

//Rename project
export const renameProject = (name, _id) => {
  return {
    type: RENAME_PROJECT,
    payload: { name, _id }
  };
};

//Delete project
export const deleteProject = _id => dispatch => {
  if (isEmpty(_id)) return;
  axios.delete(`api/projects/${_id}`).then(res => {
    dispatch({
      type: DELETE_PROJECT,
      payload: _id
    });
  });
};

export const sync = project => dispatch => {
  if (isEmpty(project)) return;
  if (project.isSynced === projectStateEnum.NOT_LOADED) return;
  dispatch(setProjectSyncing(project._id));
  axios.put(`api/projects/${project._id}`, project).then(res => {
    dispatch({
      type: SYNC,
      payload: project
    });
  });
};

export const syncAll = projects => dispatch => {
  if (isEmpty(projects)) return;
  let promises = [];
  for (let key of Object.keys(projects)) {
    let project = projects[key];
    if (project.isSynced === projectStateEnum.NOT_LOADED) continue;
    dispatch(setProjectSyncing(project._id));
    promises.push(axios.put(`api/projects/${project._id}`, project));
  }
  axios.all(promises).then(results => {
    dispatch({
      type: SYNC_ALL,
      payload: projects
    });
  });
};

//Projects loading
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};

//Project syncing
export const setProjectSyncing = _id => {
  return {
    type: PROJECT_SYNCING,
    payload: _id
  };
};
