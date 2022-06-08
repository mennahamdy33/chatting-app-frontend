import React from "react";
// import ChatFeed from "react-chat-ui";/
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import './ChatBubble.css';
const BASE_URL = "http://localhost:5000";
const person = prompt("Please enter your name:", "Harry Potter");
const socket = io(BASE_URL,{
    query: {
      name: person?person:"user"
    }
  });


function Chat(props) {
 

    const [messages, setMessages] = useState([]);
    const messageInputRef = useRef();
    useEffect(() => {
      socket.on("users", (userIds) => {
        props.setUserIds(userIds);
      });
    }, []);
  
    
    useEffect(() => {
      socket.on("delete-user", (DeletedUserId) => {
        props.setUserIds((userIds) =>
          userIds.filter((userId) => DeletedUserId !== userId.id)
        );
        console.log("userId: " +  DeletedUserId);
      });
      socket.on("new-user", (userId) => {
        props.setUserIds([...props.userIds, userId]);
        console.log("userId: " + typeof userId);
      });
      socket.on("new-message", (msg) => {
        setMessages([...messages, msg]);
        console.log("message: " + msg);
      });
      console.log(props.userIds);
    }, [messages, props.userIds]);
    function handleMessage(e) {
      e.preventDefault();
      socket.emit("message", {message: messageInputRef.current.value,userId:props.currentUser});
      setMessages([...messages, {message:messageInputRef.current.value,userId:props.currentUser}]);
      messageInputRef.current.value =''
    }
  
    
 
    return (
      <div className="container" >
        <div className="chatfeed-wrapper" style={{height: '70vh'}}>
      
{
    messages.map((message, index) => {
        let bubbleClass = 'me';
        let bubbleDirection = '';
    if(message.id === props.currentUser || message.userId === props.currentUser )
      {  if(message.id === props.currentUser ){
          bubbleClass = 'you';
          bubbleDirection = "bubble-direction-reverse";
        }
        
        return (
                <div className={`bubble-container ${bubbleDirection}`} key={index}>
                  <div className={`bubble ${bubbleClass}`}>{message.message}</div>
                </div>
            );}
      })
}


          
        </div>
        <form onSubmit={handleMessage}>
            <input
                disabled={!props.currentUser}
              ref={messageInputRef}
              placeholder="Type a message..."
              className="message-input"
            />
            
          </form>
       
        
      </div>
    );
  }

export default Chat;
