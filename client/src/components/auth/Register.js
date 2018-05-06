import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 m-auto ">
            <form action="#">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={this.state.email}
                  onchange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">User name</label>
                <input
                  type="email"
                  className="form-control"
                  id="username"
                  value={this.state.name}
                  onchange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={this.state.password}
                  onchange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  value={this.state.password2}
                  onchange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
