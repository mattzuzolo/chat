import React, { Component } from "react";
import io from "socket.io-client";

//React components
import Feed from "./Feed"
// import ConversationList from "./ConversationList"
import MessageBar from "../MessageBar"


const socketUrl = "http://192.168.0.104:4000/"
let socket = io(socketUrl);

class ChatContainer extends Component {
  constructor(props){
    super(props);


    this.state = {
      socket: null,
      user: null,
    };

    // socket.on("newMessage", (message) => {
    //   console.log("newMessage received!!!", message)
    // })


  }

  componentDidMount = () => {
    this.initSocket();
    socket.on("newMessage", (message) => {
      console.log("newMessage received!!!", message)
    })
  }

  initSocket = () => {
      socket.on("connect", () => {
        console.log("react connected");
        socket.emit("join", (error) => {
          if(error){
            alert(error);
          }
          else {
            console.log("Successful join with no error")
          }
        })
      })
      this.setState({socket})
  }


  render(){
    console.log("***render occurred***")

    socket.on("disconnect", () => {
      console.log("react disconnected");
      this.setState({socket:null})
    })

    // socket.on("newMessage", (message) => {
    //   console.log("newMessage received!!!", message)
    // })

    return (
      <div>
        <Feed />
        <MessageBar />
      </div>
    );
  }
}

export default ChatContainer;
