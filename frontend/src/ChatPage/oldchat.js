import React, { Component } from 'react'
import InputField from '../InputField';

import './Chat.css';

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            currentMessage: '',
            messageHistory: []
        }
    }

    handleSubmit = (event) => {

        event.preventDefault();

        let { username, currentMessage, messageHistory } = this.state;
        var newMessageHistory;
        messageHistory ? newMessageHistory = messageHistory : newMessageHistory = [];

        newMessageHistory.push({
            user: username,
            msg: currentMessage
        })

        this.setState({
            messageHistory: newMessageHistory
        })
        
        this.resetSubmit();

    }

    resetSubmit = () => {
        this.setState({ currentMessage: '' });
    }

    setInputValue = (val) => {
        if (val.length > 64) {
            return;
        }

        this.setState({
            currentMessage: val
        })
    }

    displayChatHistory = () => {

        let messageHistory = this.state.messageHistory;
        let chatHistory = [];

        if (messageHistory)
        {
            messageHistory.forEach(object => {
                chatHistory.push(<div>{object.user}: {object.msg}</div>);
            })
        }

        return chatHistory;

    }

    render() {
        return (
            <div className="Chat">
                <div className="ChatHistory">
                    {this.displayChatHistory()}
                </div>
                <form className="Submit" onSubmit={(event) => this.handleSubmit(event)}>
                    <InputField
                        className="Input"
                        type = 'text'
                        placeholder = 'Enter Your Message'
                        value = {this.state.currentMessage ? this.state.currentMessage : ''}
                        onChange = { (val) => this.setInputValue(val) }
                    />
                </form>
            </div>
        )
    }

}

export default Chat;