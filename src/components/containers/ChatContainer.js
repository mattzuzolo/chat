import React, { Component } from "react";
import io from "socket.io-client";

//React components
import Feed from "./Feed"
import ConversationList from "./ConversationList"
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
      console.log("newMessage received:", message)
      this.setState({
        conversationHistory: [...this.state.conversationHistory, message],
      })
    })

    socket.on("disconnect", () => {
      console.log("react disconnected");
      this.setState({socket:null})
    })
  }

  initSocket = () => {
      socket.on("connect", () => {
        console.log("react connected");
        //
        // socket.emit("createMessage", {
        //   from: "Matt",
        //   text: "Send from Matt in react"
        // });
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
    // console.log("conversationHistory at render", this.state.conversationHistory)
    return (
      <div className="container div--chat-container">
        <div className="left-column">
          <ConversationList />
        </div>

        <div className="right-column">
          <Feed conversationHistory={this.state.conversationHistory}/>
          <MessageBar
            onInputChange={this.onInputChange}
            messageDraft={this.state.messageDraft}
            createMessage={this.handleSubmit}
          />
        </div>

      </div>
    );
  }
}

export default ChatContainer;
