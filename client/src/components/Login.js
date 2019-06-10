import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

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
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          this.setState({ error: err.response.data.msg });
        }
      });
  };

  render() {
    console.log("From RENDER", this.state);
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={this.handleChange}
              required
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
            />
          </FormGroup>
          <Input type="submit" className="bg-info" />
        </Form>
      </Container>
    );
  }
}

export default Login;
