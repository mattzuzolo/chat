import React, { Component } from 'react';

class ConversationItem extends Component {
  render(){
    console.log("Convo item props", this.props)
    return(
      <div className="li li--feed-item">
        <p onClick={(event) => this.props.onConversationItemClick(event, this.props.conversation)}>{this.props.name}</p>
      </div>
    );
  }
}

export default ConversationItem;
