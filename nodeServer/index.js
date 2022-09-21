// node server which will handle socket io connection
const io = require('socket.io')(8000,{
    cors: {
        origin: '*',
      },
})

const users = {};
// console.log("Helii")
io.on('connection', socket => {  // instance of socket io.on
    // console.log("Listenings")
    socket.on('new-user-joined', name => {   // call when new user join, other will be get notification
        console.log = ("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // send msg to other all when new person enters
    });
        socket.on('send', message => {   // broadcast the msg 
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
        });

        socket.on('disconnect', message => {    //when anyone leave , give notification to all
            socket.broadcast.emit('left',  users[socket.id] );
            delete users[socket.id];
            });
})