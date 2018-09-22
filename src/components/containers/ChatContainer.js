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
  }

  componentDidMount = () => {
    this.initSocket();
    socket.on("newMessage", (message) => {
      console.log("newMessage received!!!", message)
    })

    socket.on("disconnect", () => {
      console.log("react disconnected");
      this.setState({socket:null})
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

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form has been submitted")
    socket.emit("createMessage", {
      user: "react user",
      text: 'socket.emit"createMessage" from react front end'
    }, (callbackAcknowledgement) => {
      console.log(callbackAcknowledgement)
    });
  }


  render(){
    console.log("***render occurred***")
    return (
      <div>
        <Feed />
        <MessageBar createMessage={this.handleSubmit}/>
      </div>
    );
  }
}

export default ChatContainer;
