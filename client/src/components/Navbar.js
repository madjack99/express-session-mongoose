import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from "reactstrap";

class MyNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  showNavItems = () => {
    return this.props.loggedUser ? (
      <NavItem>
        <NavLink to="/logout" className="mr-4 text-white" onClick={this.toggle}>
          Logout
        </NavLink>
      </NavItem>
    ) : (
      <Fragment>
        <NavItem>
          <NavLink
            to="/register"
            className="mr-4 text-white"
            onClick={this.toggle}
          >
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/login"
            className="mr-4 text-white"
            onClick={this.toggle}
          >
            Login
          </NavLink>
        </NavItem>
      </Fragment>
    );
  };

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavLink className="text-danger text-decoration-none" to="/">
          <h2>Site for posts</h2>
        </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/" className="mr-4 text-white" onClick={this.toggle}>
                Home
              </NavLink>
            </NavItem>
            {this.showNavItems()}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  loggedUser: state.users.loggedUser
});

export default connect(mapStateToProps)(MyNavbar);
