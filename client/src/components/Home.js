import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, addPost } from "../actions/postActions";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardFooter
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
    const { title, text } = this.state;
    this.props.addPost({
      title,
      text,
      author: this.props.loggedUser.name
    });
    this.toggle();
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <Container>
        {!this.props.loggedUser ? (
          <h1 className="bg-danger p-2 mt-1 rounded text-center">
            Login to create post
          </h1>
        ) : (
          <Button className="mt-3" color="danger" onClick={this.toggle}>
            CreatePost
          </Button>
        )}

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
            <Card className="mt-3" key={post._id}>
              <CardHeader>{post.title}</CardHeader>
              <CardBody>
                <CardText>{post.text}</CardText>
              </CardBody>
              <CardFooter>By: {post.author}</CardFooter>
            </Card>
          );
        })}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loggedUser: state.users.loggedUser
});

export default connect(
  mapStateToProps,
  { getPosts, addPost }
)(Home);
