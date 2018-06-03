import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import projectsReducer from "./projectsReducer";
import controlsReducer from "./controlsReducer";
import optimisationReducer from "./optimisationReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  projects: projectsReducer,
  controls: controlsReducer,
  optimisation: optimisationReducer,
  settings: settingsReducer
});
