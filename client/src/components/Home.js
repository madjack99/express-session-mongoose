import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions/postActions";
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

class Home extends Component {
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

  componentDidMount() {
    this.props.getPosts();
  }

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
        {this.props.posts.map(post => {
          return (
            <div>
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <h4>{post.author}</h4>
            </div>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Home);
