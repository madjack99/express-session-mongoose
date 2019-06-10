import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem
} from "reactstrap";

class MyNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">My Site</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="/" className="mr-4 text-white" onClick={this.toggle}>
                Home
              </NavLink>
            </NavItem>
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
            <NavItem>
              <NavLink
                to="/logout"
                className="mr-4 text-white"
                onClick={this.toggle}
              >
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default MyNavbar;
