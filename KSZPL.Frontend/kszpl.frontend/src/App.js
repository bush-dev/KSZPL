import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";
import AppBarContainer from "./containers/AppBarContainer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginContainer from "./containers/LoginContainer";

class App extends Component {
  componentDidMount() {
    document.title = "KSZPL";
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="Header">
            <AppBarContainer />
          </div>
          <div className="Body">
            {localStorage.getItem("token") ? <Routes /> : <LoginContainer />}
          </div>
          <div className="Footer">©2019 KSZPL. All rights reserved.</div>
        </div>
      </Router>
    );
  }
}

export default App;
