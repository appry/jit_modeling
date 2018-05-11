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

import isEmpty from "../validation/is-empty";
//Get project by id
export const getProject = _id => dispatch => {
  axios
    .get(`api/projects/${_id}`)
    .then(res => {
      dispatch({
        type: GET_PROJECT,
        payload: { jsonData: res.data, _id }
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
  if (data.model === undefined) {
    console.log(data.model);
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
