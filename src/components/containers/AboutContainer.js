import React, { Component } from 'react';

class AboutContainer extends Component {
  render(){
    return(
      <div className="container div--about-container">
        <h1>This was created by <a href="https://www.github.com/mattzuzolo">Matt Zuzolo</a>.</h1>
        <p>You can view the code on my <a href="https://www.github.com/mattzuzolo">GitHub page</a>.</p>
      </div>
    );
  }
}

export default AboutContainer;
