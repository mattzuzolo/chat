import React, { Component } from 'react';

class FeedItem extends Component {
  render(){
    return(
      <div className="li li--feed-item">
        <p>{this.props.user}: {this.props.id}</p>
      </div>
    );
  }
}

export default FeedItem;
