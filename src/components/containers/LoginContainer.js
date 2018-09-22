import React, { Component } from 'react';

class RegisterContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUsername: "",
    }
  }

  onCurrentUsernameChange = (event) => {
    this.setState({currentUsername: event.target.value})
  }

  render(){
    return(
      <div className="container div--new-chat">
        <h1>Login</h1>
        <form onSubmit={(event) => this.props.handleLoginSubmit(event, this.state.currentUsername)}>
          <input
            placeholder="Login"
            value={this.state.currentUsername}
            onChange={this.onCurrentUsernameChange}
          >
          </input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default RegisterContainer;
