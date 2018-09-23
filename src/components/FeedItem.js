import React, { Component } from 'react';

class FeedItem extends Component {
  render(){
    return(
      <div className="li li--feed-item">

        { this.props.user
                        ? <p>{this.props.user.username}: {this.props.text}</p>
                        : null
        }


      </div>
    );
  }
}

export default FeedItem;
