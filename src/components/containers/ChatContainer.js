import React, { Component } from "react";
import io from "socket.io-client";

//React components
import Feed from "./Feed"
import MessageBar from "../MessageBar"

//Socket configuration
const socketUrl = "http://192.168.0.104:4000/"
let socket = io(socketUrl);

class ChatContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      socket: null,
      user: "the ghost of react",
      messageDraft: "",
      conversationHistory: [{
        user: "Matt",
        text: "Message #1",
      },{
        user: "Marc",
        text: "Message #2",
      },{
        user: "Matt",
        text: "Message #3",
      }],
    };
  }

  componentDidMount = () => {
    this.initSocket();

    socket.on("newMessage", (message) => {
      console.log("newMessage received", message)
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

  onInputChange = (event) => {
    this.setState({messageDraft: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let messageBody = {
      user: this.state.user,
      text: this.state.messageDraft
    }
    socket.emit("createMessage", messageBody, (callbackAcknowledgement) => {
      console.log(callbackAcknowledgement)
    });
    this.setState({
      messageDraft: "",
      conversationHistory: [...this.state.conversationHistory, messageBody],
    })
  }


  render(){
    console.log("conversationHistory at render", this.state.conversationHistory)
    return (
      <div>
        <Feed conversationHistory={this.state.conversationHistory}/>
        <MessageBar
          onInputChange={this.onInputChange}
          messageDraft={this.state.messageDraft}
          createMessage={this.handleSubmit}
        />
      </div>
    );
  }
}

export default ChatContainer;
