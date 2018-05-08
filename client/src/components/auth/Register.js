import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
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
          <div className="col-md-6 col-sm-10 m-auto ">
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                name="email"
                type="email"
                value={this.state.email}
                label="Email"
                onChange={this.onChange}
                error={errors.email}
              />
              <TextFieldGroup
                name="name"
                type="text"
                value={this.state.name}
                label="Name"
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                name="password"
                type="password"
                value={this.state.password}
                label="Password"
                onChange={this.onChange}
                error={errors.password}
              />
              <TextFieldGroup
                name="password2"
                type="password"
                value={this.state.password2}
                label="Confirm password"
                onChange={this.onChange}
                error={errors.password2}
              />

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
