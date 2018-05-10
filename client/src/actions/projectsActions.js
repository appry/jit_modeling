import axios from "axios";

import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  CREATE_PROJECT,
  SELECT_PROJECT,
  RENAME_PROJECT,
  DELETE_PROJECT,
  SYNC,
  SYNC_ALL,
  PROJECT_SYNCING
} from "./types";

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
export const selectProject = _id => {
  return {
    type: SELECT_PROJECT,
    payload: _id
  };
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
  axios.delete(`api/projects/${_id}`).then(res => {
    dispatch({
      type: DELETE_PROJECT,
      payload: _id
    });
  });
};

export const sync = project => dispatch => {
  dispatch(setProjectSyncing(project));
  axios.put(`api/projects/${project._id}`, project).then(res => {
    dispatch({
      type: SYNC,
      payload: project
    });
  });
};

export const syncAll = projects => dispatch => {
  let promises = [];
  for (let key of Object.keys(projects)) {
    let project = projects[key];
    dispatch(setProjectSyncing(project));
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
export const setProjectSyncing = project => {
  return {
    type: PROJECT_SYNCING,
    payload: project
  };
};
