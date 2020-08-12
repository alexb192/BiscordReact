import React from 'react';
import SubmitButton from '../SubmitButton';
import Chat from './Chat';
import SideBar from './SideBar';
import './ChatPage.css';

// this is more or less a container for the elements of the page

function ChatPage({ doLogout, username }){

    if (username)
    {
      return (
        <div className="container">
          <div className="header">
            <div className="username" >
              {username ? username : 'NameNotFound'}
            </div>
            <div className="logOutButton">
              <SubmitButton
                text={'Log Out'}
                disabled={false}
                onClick={() => doLogout()}
              />
            </div>
          </div>
          <div className="chatContainer">
            <div className="chat">
              <Chat username={username} />
            </div>
            <div className="sidebar">
              <SideBar username={username} />
            </div>
          </div>
        </div>
      )
    }

    else return (
      <div className="logOutButton">
        <h1>fucky wucky</h1>
        <SubmitButton
          text={'Log Out'}
          disabled={false}
          onClick={() => doLogout()}
        />
      </div>
    )
    
}

export default ChatPage;