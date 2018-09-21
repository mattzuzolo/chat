import React, { Component } from "react";
import io from "socket.io-client"

// import NavBar from "../NavBar";


const socketUrl = "http://192.168.0.104:4000/"

class Layout extends Component {
  constructor(props){
    super(props);

    this.state = {
      socket: null,
      user: null,
    };
  }

  componentDidMount = () => {
    this.initSocket();
  }

  initSocket = () => {
      const socket = io(socketUrl)
      socket.on("connect", () => {
        console.log("react connected");
      })
      this.setState({socket})
  }

  render(){
    return (
      <div>
      </div>
    );
  }
}

export default Layout;
