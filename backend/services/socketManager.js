/**
 * socket manager
 * @param server
 * @param app
 */
const  User = require('../models/user.model').User;
module.exports = function (server) {
  // app.sockets = [];
  // app.connections = {};
  var io = require('socket.io').listen(server);
  // app.io = io;

  io.sockets.on('connection', function (socket) {
    // app.sockets.push(socket.id);
    console.log('New socket connected');

    socket.on('join', function (data) {
      console.log('login request with data: ', data);
      User.findOne({username: data.username}).exec().then( user => {
        console.log(user, data.username);
        
        user.status = 'online';
        socket.broadcast.emit('newUserJoined',user);
        return user.save();
        

      });
    });

    socket.on('message', function (msg) {
      io.to(msg.room).emit('message', msg);
    });

    socket.on('leave', function (data) {
      console.log(data);
      User.findOne({username: data.username}).exec().then( user => {
        console.log(user, data.username);
        user.status = 'offline';
        socket.broadcast.emit('newUserLeaved',user);
        return user.save();
        

      });
    });
  });

  // app.get('/sockets', function (req, res) {
  //   res.send({sockets: app.sockets, connections: app.connections});
  // });
};
