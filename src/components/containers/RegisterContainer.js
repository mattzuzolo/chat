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
        <h1>Create an account</h1>
        <form onSubmit={(event) => this.props.handleRegisterSubmit(event, this.state.currentUsername)}>
          <input
            placeholder="Create a username"
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
