import React, { Component } from 'react';

import FeedItem from "../FeedItem"

class Feed extends Component {
  render(){
    console.log("Feed with array", this.props.conversationHistory)
    return(
      <div className="container div--feed">
        Feed
        {this.props.conversationHistory.map(message => (
          <FeedItem
            message={message}
            user={message.user}
            text={message.text}
          />
      ))}
      </div>
    )
  }
}

export default Feed;
