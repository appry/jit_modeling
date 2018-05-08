import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8 m-auto ">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">User name</label>
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.name
                  })}
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.password
                  })}
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm password</label>
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.password2
                  })}
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.onChange}
                />
                {errors.password2 && (
                  <div className="invalid-feedback">{errors.password2}</div>
                )}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
