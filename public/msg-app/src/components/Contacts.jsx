import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Contacts({ contacts }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await JSON.parse(localStorage.getItem("msg-app-user"));
      setCurrentUserName(data.username);
    }
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <div className="brand">
          <h3>text</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="username">
            <h1>{currentUserName}</h1>
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    .contact {
      background-color: #ffffff39;
    }
  }
`;
