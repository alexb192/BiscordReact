import React from 'react';
import socketIOClient from 'socket.io-client';
import './Chat.css';

const ENDPOINT = "24.57.124.99:3001";    // this is just my local ip address, socket uses 3001 port on my app
const socket = socketIOClient(ENDPOINT);

class Chat extends React.Component {
 
    constructor(props)
    {
        super(props)
        this.state = {
            messageHistory: []      // this is displayed as a div.
        }
    }

    componentDidMount() {
        socket.emit('new-user', this.props.username);   // tells everyone this user is here
    
        socket.on('chat-message', data => { // broadcasted message from someone
            let chatHistory = this.state.messageHistory;
            chatHistory.push(<div>{data.name}: {data.message}</div>);
            this.setState({ messageHistory: chatHistory });
        });

        socket.on('disconnect-message', name => {   // prints out a message when someone disconnects
            let chatHistory = this.state.messageHistory;
            chatHistory.push(<div>{name} disconnected</div>);
            this.setState({ messageHistory: chatHistory });
        })
    
        socket.on('user-connected', username => {   // tells us when another connects
            let chatHistory = this.state.messageHistory;
            chatHistory.push(<div>{username} connected</div>);
            this.setState({ messageHistory: chatHistory });
        });
    }

    componentWillUnmount()
    {
        socket.emit('user-disconnecting', this.props.username);  // tell everyone else when we disconnect
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let message = document.getElementById('message-input').value;

        let chatHistory = this.state.messageHistory;
        chatHistory.push(<div>{this.props.username}: {message}</div>);  // temporary array to be pushed
        this.setState({ messageHistory: chatHistory }); // pushes the message to be displayed

        socket.emit('send-chat-message', message)   // gives everybody a message we sent
        this.resetSubmit();
    }

    resetSubmit = () => {
        document.getElementById('message-input').value = '';
    }

    render()
    {
        return (
            <div className="chat-container">
                <div className="message-container" id="message-container">{this.state.messageHistory}</div>
                <form autoComplete="off" className="send-container" id="send-container" onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" id="message-input"></input>
                </form>
            </div>
        )
    }

}
 
export default Chat;