import React, { Component } from "react";
import io from "socket.io-client";
import moment from "moment";

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
      user: "user",
      messageDraft: "",
      currentConversation: {messages: ["Hi"]},
      conversationHistory: [],
    };
  }

  componentDidMount = () => {
    this.initSocket();

    //listens for a new message. Adds new messages to conversationHistory state to update feed
    socket.on("newMessage", (message) => {
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
      user: this.props.loggedInUser,
      text: this.state.messageDraft
    }
    //only allow logged in user to send messages
    if(this.props.loggedInUser || !this.props.loggedInUser){
      socket.emit("createMessage", messageBody, (callbackAcknowledgement) => {
        console.log(callbackAcknowledgement)
      });
      //adds messages to feed created by local user. Also resets input bar
      this.setState({
        messageDraft: "",
        conversationHistory: [...this.state.conversationHistory, messageBody],
      })
    } else {
      alert("YOU MUST BE LOGGED IN TO SEND A MESSAGE")
      return this.props.history.push("/register")
    }

  }

  onConversationItemClick = (event, currentConversation) => {
    this.setState({currentConversation})
  }



  render(){
    console.log("Current conversation in ChatContainer", this.state.currentConversation)

    return (
      <div className="container div--chat-container">
        <div className="left-column">
          <ConversationList
            loggedInUser={this.props.loggedInUser}
            currentConversation={this.state.currentConversation}
            onConversationItemClick={this.onConversationItemClick}
          />
        </div>

        <div className="right-column">
          <Feed
            conversationHistory={this.state.conversationHistory}
            loggedInUser={this.props.loggedInUser}
            currentConversation={this.state.currentConversation}
          />
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
