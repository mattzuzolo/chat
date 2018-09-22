import React, { Component } from 'react';

class MessageBar extends Component {
  render(){
    return(
      <div className="container div--message-bar">
        <form onSubmit={this.props.createMessage}>
          <input
            placeholder="Send a message..."
            onChange={this.props.onInputChange}
            value={this.props.messageDraft}
          >
          </input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MessageBar;
