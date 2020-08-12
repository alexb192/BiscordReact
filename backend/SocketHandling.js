const io = require('socket.io')();

const users = {};

SocketHandling = () => {

    io.on('connection', socket => {
        socket.on('new-user', name => {
            let tempObject = Object.entries(users);
            var nameTest;
            var key;
            tempObject.forEach((array) => { // gives me the socket's key for a username that already exists on the server.
                if (array.includes(name))
                {
                    nameTest = true;
                    key = array[0];
                }
            })
            if (nameTest)     // this is to stop people from refreshing the page and getting a new socket, creating duplicates
                delete users[key];
            users[socket.id] = name     // all clear, all issues resolved, now connect the new user
            socket.broadcast.emit('user-connected', name)
            console.log(`${name} has connected`);
            socket.broadcast.emit('current-users', Object.values(users))
        })


        socket.on('send-chat-message', message => {
            console.log(`${users[socket.id]}: ${message}`);
            socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
        })


        socket.on('user-disconnecting', (name) => {
            let socketKeys = Object.keys(users);
            socketKeys.forEach((key) => {
                if (users[key] == name ) delete users[key]; // properly deletes users
            })
            socket.broadcast.emit('current-users', Object.values(users));
            socket.broadcast.emit('disconnect-message', name);
            console.log(`${name} has disconnected`);
        })
    })

    io.listen(3001);

}

module.exports = SocketHandling;