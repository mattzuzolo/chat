import React, { Component } from 'react';

class NewChat extends Component {

  handleFormSubmit = (event) => {
    event.preventDefault()
    
  }

  render(){
    return(
      <div className="container div--new-chat">
        <h1>Create a new chat!</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            placeholder="Create a chatroom..."
          >
          </input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default NewChat;
