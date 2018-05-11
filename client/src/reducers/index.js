import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectsReducer from "./projectsReducer";
import controlsReducer from "./controlsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projects: projectsReducer,
  controls: controlsReducer
});
