import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { addUser } from "../actions/userActions";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Alert
} from "reactstrap";

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
    e.preventDefault();
    const { name, email, password } = this.state;
    axios
      .post("/api/users/register", {
        name,
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
        const error = err.response.data.msg;
        if (error) {
          this.setState({ error, name: "", email: "", password: "" });
        }
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div>
        <Container>
          <h1>Register</h1>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="nameInput">Name</Label>
              <Input
                type="text"
                name="name"
                id="nameInput"
                value={this.state.name}
                onChange={this.handleChange}
                required
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
                required
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
                required
              />
            </FormGroup>
            <Button className="bg-success" block>
              Regiser
            </Button>
          </Form>
          {error ? (
            <Alert className="mt-3" color="danger">
              {error}
            </Alert>
          ) : null}
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { addUser }
)(Register);
