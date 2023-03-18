import React, { useState } from 'react';
import styled from 'styled-components';

function Contacts({ contacts, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <Container>
      <div className='brand'>
        <h3>DevChat</h3>
      </div>
      <div className='contacts'>
        {contacts.map((contact, index) => {
          return (
            <div
              key={index}
              className={`contact ${
                index === currentSelected ? 'selected' : ''
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className='username'>
                <h3>{contact.userName}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #ffffff39;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
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
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #fff;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #fff;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .username {
        h3 {
          color: #000;
        }
      }
    }
    .selected {
      background-color: #ffa500;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .username {
      h2 {
        color: black;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
export default Contacts;
