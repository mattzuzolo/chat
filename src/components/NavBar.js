import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item" to="/feed">Feed</Link>
        <Link className="nav-item div--nav-bar-item nav-right" to="/about">About</Link>
      </div>
    )
  }
}

export default (NavBar);
