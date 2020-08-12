import React from 'react'
import socketIOClient from 'socket.io-client';
import './SideBar.css';

const ENDPOINT = "24.57.124.99:3001";    // this is just my local ip address, socket uses 3001 port on my app
const socket = socketIOClient(ENDPOINT);

class SideBar extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() 
    {
        socket.on('current-users', (usernames) => {
            let tempArray = [];
            usernames.forEach(username => {
                tempArray.push(<div>{username}</div>);  // get each username
            });                                         // from backend and
            this.setState({ users: tempArray });        // deposit in divs
        })                                              // when a user connects
    }

    render() 
    {
        return (
            <div className="users">
                {this.state.users}
            </div>
        )
    }

}

export default SideBar;