import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";
import "./style/App.css";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ModelingPage from "./components/modeling/ModelingPage";

Object.filter = (obj, predicate) =>
  Object.assign(
    {},
    ...Object.keys(obj)
      .filter(key => predicate(obj[key]))
      .map(key => ({ [key]: obj[key] }))
  );

Object.map = (obj, callback) =>
  Object.assign({}, ...Object.keys(obj).map(k => ({ [k]: callback(obj[k]) })));
Object.find = (obj, callback) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (callback(obj[prop])) return obj[prop];
    }
  }
  return undefined;
};
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route
                exact
                path="/"
                render={props => <Redirect to="/modeling" />}
              />
              <Switch>
                <PrivateRoute exact path="/modeling" component={ModelingPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
