import React from 'react';
import { observer } from 'mobx-react'; 
import UserStore from './stores/UserStore';
import ChatPage from './ChatPage/ChatPage';
import LoginForm from './LoginForm/LoginForm';
import './App.css';

class App extends React.Component {

  async componentDidMount() {
    try {

      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    }

    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {

      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }
    }

    catch(e) {
      console.error(e);
    }
  }

  render() {

    if (UserStore.loading) {
      return (
        <div className="app">
          <div className = 'container'>
            Loading, please wait...
          </div>
        </div>
      );
    }

    else {

      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className = 'container'>
              <ChatPage username={UserStore.username} doLogout={this.doLogout} />
            </div>
          </div>
        );
      }

      else {
        return (
          <div className="app">
            <div className = 'container'>
              <LoginForm />
            </div>
          </div>
        );
      }

    }

  }

}

export default observer(App);
