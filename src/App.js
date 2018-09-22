//React imports
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

//Local imports
import './App.css';
import NavBar from "./components/NavBar"
import ChatContainer from "./components/containers/ChatContainer"
import AboutContainer from "./components/containers/AboutContainer";

class App extends Component {
  render() {
    return (
      <div className="container div--app App">
        <Route path="/" render={(routerProps) => <NavBar
          {...routerProps} />}/>
          <Switch>
            <Route path="/feed" component={ChatContainer} />
            <Route path="/about" component={AboutContainer} />
            {/*
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={AboutContainer} />
            <Route path="/me" component={LoginContainer} />
            */}
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
