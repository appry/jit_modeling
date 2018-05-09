import axios from "axios";

import {
  GET_PROJECTS,
  PROJECTS_LOADING,
  CREATE_PROJECT,
  SELECT_PROJECT
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
  axios
    .post("api/projects", { name })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: CREATE_PROJECT,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

//Select project
export const selectProject = _id => {
  return {
    type: SELECT_PROJECT,
    payload: _id
  };
};

//Projects loading
export const setProjectsLoading = () => {
  return {
    type: PROJECTS_LOADING
  };
};
