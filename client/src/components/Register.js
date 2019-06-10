import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";

export class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    loggedUser: null,
    error: null
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.prevent.default();
  };

  render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nameInput">Name</Label>
              <Input
                type="text"
                name="name"
                id="nameInput"
                required
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="emailInput">Email</Label>
              <Input
                type="email"
                name="email"
                id="emailInput"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="passwordInput">Password</Label>
              <Input
                type="password"
                name="password"
                id="passwordInput"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button className="bg-success" block>
              Regiser
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
