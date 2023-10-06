import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
//import Messages from "./Messages";
import axios from "axios";

export default function ChatContainer({ currentChat, currentUser, msg }) {
  const [messages, setMessages] = useState([msg]);

  // cannot read properties of undefined (map) line 45
  // edit, it is now loading an empty array since I took out the map function.
  // the current plan is to rework how I'm going to integrate a map function with useEffect
  // u_u


  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(getAllMessagesRoute, msg);
        let data = await response.json(msg);
        let newState = data.map((msg) => msg);
        setMessages(newState);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  }, [msg]) // am I missing a forEach?

 // useEffect(() => {
 //   async function fetchData() {
 //     const data = await axios.get(getAllMessagesRoute, {
 //       from: currentUser,
 //       to: currentChat,
//      });
//      setMessages(data.currentChat);
//    }
//    fetchData();
//  }, [currentUser, currentChat]);

// This seems to work just fine
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    }, [messages, setMessages]);
  };
  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>

          <div className="content">
            <p>{messages}</p>
          </div>

          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;
