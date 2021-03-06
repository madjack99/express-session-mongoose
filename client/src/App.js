import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import MyNavbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyNavbar />
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </div>
    </BrowserRouter>
  );
}

export default App;
