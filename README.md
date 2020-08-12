# BiscordReact
reactjs sockets, basic web chat application

This is just a simple project I decided to do to make sure i understanded the fundamental concepts of react state, props, classes, hooks, etc...
Uses sockets to transfer data, log new users, keep track of them and manage them, and send messages between them.
You're able to log in from any location and all other users will be able to see you in the room and see that you joined in chat.
Any messages received will be 'broadcasted' to you using socket.io and any messages you send will be broadcasted to the other users.
The server keeps a log of all events that happen in its backend event handling.

The frontend is pure ReactJS code that I only used to build and put it in the backend. 
The backend serves the built React project and handles everything.

The moment I made the project functional and moderately useable, I stopped developing convenience features because I got what I wanted out of the project,
some good practice.

This also has a fully functioning login system with a database to hold all of the users, and it encrypts the data both ways to ensure security.
This was another subject I wanted practice on and I've made a completely secure, seamless login system that caches which user is currently logged in
and won't allow any other client to log in with that user. Not only that, once a username is taken, nobody else may have that user as it is unique.
This took a large majority of the development time.
