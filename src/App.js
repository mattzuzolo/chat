//React imports
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

//Local imports
import './App.css';
import NavBar from "./components/NavBar"
import ChatContainer from "./components/containers/ChatContainer";
import NewChat from "./components/containers/NewChat"
import AboutContainer from "./components/containers/AboutContainer";
import RegisterContainer from "./components/containers/RegisterContainer";


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInUser: "",
    }
  }

  handleRegisterSubmit = (event, loggedInUser) => {
    event.preventDefault()
    this.setState({loggedInUser})
    this.props.history.push("/feed")
  }

  render() {
    console.log("CURRENT LOGGED IN USER:", this.state.loggedInUser)
    return (
      <div className="container div--app App">
        <Route path="/" render={(routerProps) => <NavBar
          {...routerProps} />}/>
          <Switch>
            <Route path="/feed" render={(props) => <ChatContainer
              loggedInUser={this.state.loggedInUser} history={this.props.history} />}/>
            <Route path="/new" render={(props) => <NewChat
              loggedInUser={this.state.loggedInUser} />}/>
            <Route path="/about" component={AboutContainer} />
            <Route path="/register" render={(props) => <RegisterContainer
              handleRegisterSubmit={this.handleRegisterSubmit}
              loggedInUser={this.state.loggedInUser} />}
            />
            {/*
              <Route path="/feed" component={ChatContainer} />
            <Route path="/login" component={LoginContainer} />
            <Route path="/me" component={LoginContainer} />
            */}
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
