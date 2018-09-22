import React, { Component } from 'react';

import ConversationItem from "../ConversationItem"

class ConversationList extends Component {
  render(){
    return(
      <div className="container div--conversation-list">
        ConversationList
        <ConversationItem />
      </div>
    );
  }
}

export default ConversationList;
