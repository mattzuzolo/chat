import React, { Component } from "react";
import io from "socket.io-client";

//React components
import Feed from "./Feed"
import ConversationList from "./ConversationList"
import MessageBar from "../MessageBar"

//Socket configuration
const socketUrl = "http://192.168.0.104:4000/"
let socket = io(socketUrl);

const conversationUrl = "http://localhost:4000/conversations"

class ChatContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      socket: null,
      user: "user",
      messageDraft: "",
      currentConversation: null,
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
      user: this.props.loggedInUser.username,
      text: this.state.messageDraft
    }
    console.log("MESSAGE BODY ON SUBMIT", messageBody)
    //only allow logged in user to send messages
      socket.emit("createMessage", messageBody, (callbackAcknowledgement) => {
        console.log(callbackAcknowledgement)
      });
      //adds messages to feed created by local user. Also resets input bar
      this.setState({
        messageDraft: "",
        conversationHistory: [...this.state.conversationHistory, messageBody],
      })


  }

  onConversationItemClick = (event, currentConversation) => {
    this.setState({currentConversation})
  }



  render(){
    console.log("Current conversation", this.state.currentConversation)
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
