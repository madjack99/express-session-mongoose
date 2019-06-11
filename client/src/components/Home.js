import React, { Component } from "react";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModelFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default class Home extends Component {
  state = {
    modal: false,
    title: "",
    text: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.toggle();
  };

  render() {
    return (
      <Container>
        <h1 className="bg-success p-2 mt-1 rounded text-center">
          Login to create post
        </h1>
        <Button color="danger" onClick={this.toggle}>
          CreatePost
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Create you post</ModalHeader>
          <Container>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" required onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="text">Text</Label>
                <Input
                  type="textarea"
                  id="text"
                  required
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button className="bg-danger mb-2 " block>
                Create post
              </Button>
            </Form>
          </Container>
        </Modal>
      </Container>
    );
  }
}
