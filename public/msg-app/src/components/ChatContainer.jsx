import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import Logout from "./Logout";
//import { v4 as uuidv4 } from "uuid";
import ChatInput from "./ChatInput";
//import Messages from "./Messages";
import axios from "axios";

export default function ChatContainer({ currentUser, currentChat }) {
  //at the moment, I haven't gotten useState to save and load messages from the db
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      const response = await axios.get(getAllMessagesRoute, {
        // when I add _id to these, I get an error
        from: currentUser,
        to: currentChat,
      });
      setMessages(response.data);
    }
    fetchMessages(); // Moving this makes no sense because I'll be unable to call the function
  }, [currentUser, currentChat]);

  // This seems to work just fine
  const handleSendMsg = async (msg) => {
    await axios.post(
      sendMessageRoute,
      // No issues with _id here?
      {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      },
      [messages, setMessages]
    );

    // So I tried to render from the array OUTSIDE of the handleSendMsg function
    // and then had the audacity to wonder why nothing was happening
    const msgs = [...messages];
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
            {messages.map((message) => {
              return (
                <div>
                  <div
                    className={`message ${
                      message.fromSelf ? "sent" : "received"
                    }`}
                  >
                    <div className="content">
                      <p key={message._id}>{message.message}</p>
                    </div>
                  </div>
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
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
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
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
      }
    }
    .sent {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
