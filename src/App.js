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
import LoginContainer from "./components/containers/LoginContainer";


const userUrl = "http://localhost:4000/users";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInUser: "",
    }
  }

  handleRegisterSubmit = (event, newUser) => {
    event.preventDefault()
    this.postNewUser(newUser)
      .catch(console.error)
    this.props.history.push("/login")
  }

  postNewUser = (username) => {
    const userPostConfig = {
      Accept: "application/json",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({username})
    };
    console.log("URL TO FETCH", userUrl);
    console.log("POSTCONFIG TO FETCH", userPostConfig);
    return fetch(userUrl, userPostConfig)
  }

  handleLoginSubmit = (event, loggedInUser) => {
    event.preventDefault()
    this.loginUser(loggedInUser)
  }

  loginUser = (username) => {
    fetch(userUrl)
      .then(response => response.json())
      .then(response => response.users)
      .then(users => users.find(user => user.username === username))
      .then(loggedInUser => this.setState({loggedInUser}))
      .catch(console.log("THIS USER DOES NOT EXIST"))
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

            <Route path="/login" render={(props) => <LoginContainer
              handleLoginSubmit={this.handleLoginSubmit}
            />}/>

            <Route path="/register" render={(props) => <RegisterContainer
              handleRegisterSubmit={this.handleRegisterSubmit}
            />}/>

            {/*
            <Route path="/me" component={LoginContainer} />
            */}
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
