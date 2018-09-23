import React, { Component } from 'react';
import FeedItem from "../FeedItem"

class Feed extends Component {
  render(){
    return(
      <div className="container div--feed">
        { this.props.currentConversation
                        ? this.props.currentConversation.messages.map(message => (
                          <FeedItem
                            message={message}
                            id={message._id}
                            user={message.user}
                            text={message.text}
                          />
                        ))
                        : null
        }
      </div>
    )
  }
}

export default Feed;



// {this.props.currentConversation.messages.map(message => (
//   <FeedItem
//     message={message}
//     user={message.user}
//     text={message.text}
//   />
// ))}
