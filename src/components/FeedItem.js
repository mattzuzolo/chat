import React, { Component } from 'react';

class FeedItem extends Component {
  render(){
    // console.log("FEEDITEM", this.props.message)
    return(
      <div className="li li--feed-item">
        <p>{this.props.user}: {this.props.text}</p>
      </div>
    );
  }
}

export default FeedItem;
