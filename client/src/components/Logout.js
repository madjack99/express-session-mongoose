import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { removeUser } from "../actions/userActions";

function Logout(props) {
  axios
    .post("/api/users/logout")
    .then(res => res.json({ msg: "You have logged out" }))
    .catch(err => console.log("ERROR from logout", err));
  props.removeUser();
  props.history.push("/login");
  return <div />;
}

export default connect(
  null,
  { removeUser }
)(Logout);
