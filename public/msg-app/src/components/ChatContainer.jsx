import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
//import Messages from "./Messages";
import axios from "axios";

export default function ChatContainer({ currentUser, currentChat }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await axios.get(getAllMessagesRoute, {
        from: currentUser,
        to: currentChat,
      });
      setMessages(response.data);
    }
    fetchMessages();
  }, [currentUser, currentChat]);

  // This seems to work just fine
  const handleSendMsg = async (msg) => {
    await axios.post(
      sendMessageRoute,
      {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      },
      [messages, setMessages]
    );

    const msgs = [...messages]; //I FUCKING FIXED IT
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
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

          <div className="chat-messages">
            {messages &&
              messages.map((message) => {
                return (
                  <div>
                    <p>{message.message}</p>
                  </div>
                );
              })}
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
