import React, { Component } from 'react';

import ConversationItem from "../ConversationItem"

const conversationUrl = "http://localhost:4000/conversations"

class ConversationList extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentConversationName: "",
      conversationArray: [],
    };
  }

  componentDidMount(){
    fetch(conversationUrl)
      .then(response => response.json())
      .then(response => this.setState({conversationArray: response.conversations}))
  }



  onConversationNameChange = (event) => {
    this.setState({currentConversationName: event.target.value})
  }

  onNewConversationSubmit = (event) => {
    event.preventDefault();
    let postConversationBody = {
      name: this.state.currentConversationName,
      members: [this.props.loggedInUser]
    }
    this.setState({conversationArray: [...this.state.conversationArray, postConversationBody]})
    this.postNewConversation(postConversationBody)
  }

  postNewConversation = (postConversationBody) => {
    const conversationPostConfig = {
      Accept: "application/json",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(postConversationBody)
    };
    return fetch(conversationUrl, conversationPostConfig)
  }

  render(){
    return(
      <div className="container div--conversation-list">
        <div className="div div--new-conversation">
          <p>Start a new conversation</p>
          <form onSubmit={this.onNewConversationSubmit}>
            <input placeholder="Give it a name!" onChange={this.onConversationNameChange}></input>
            <button>Submit</button>
          </form>
        </div>

        <h3>Available conversations:</h3>
        {this.state.conversationArray.map(conversation => (
          <ConversationItem
          conversation={conversation}
          id={conversation._id}
          name={conversation.name}
          onConversationItemClick={this.props.onConversationItemClick}
          />
        ))}


      </div>
    );
  }
}

export default ConversationList;
