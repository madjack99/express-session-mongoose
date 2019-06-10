import React from "react";
import axios from "axios";

function Logout(props) {
  axios
    .post("/api/users/logout")
    .then(res => res.json({ msg: "You have logged out" }))
    .catch(err => console.log("ERROR from logout", err));
  localStorage.clear();
  props.history.push("/login");
  return <div />;
}

export default Logout;
