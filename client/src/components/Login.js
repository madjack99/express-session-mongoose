import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import { addUser } from "../actions/userActions";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    loggedUser: null
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("/api/users/login", {
        email,
        password
      })
      .then(res => {
        const { loggedUser } = res.data;
        if (loggedUser) {
          this.setState({ loggedUser, error: null });
          this.props.addUser(loggedUser);
        }
        this.props.history.push("/");
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState({
            error: err.response.data.msg,
            email: "",
            password: ""
          });
        }
      });
  };

  render() {
    const { error } = this.state;
    return (
      <Container>
        <h1>Log in</h1>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={this.handleChange}
              required
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.handleChange}
              required
              value={this.state.password}
            />
          </FormGroup>
          <Input type="submit" className="bg-info" />
        </Form>
        {error ? (
          <Alert className="mt-3" color="danger">
            {error}
          </Alert>
        ) : null}
      </Container>
    );
  }
}

export default connect(
  null,
  { addUser }
)(Login);
