/**
 * socket manager
 * @param server
 * @param app
 */
const  User = require('../models/user.model').User;
const _ = require('underscore');
module.exports = function (app,server) {
   app.sockets = [];
  // app.connections = {};
  var io = require('socket.io').listen(server);
  // app.io = io;

  io.sockets.on('connection', function (socket) {
     app.sockets.push(socket.id);
    console.log('New socket connected');

    socket.on('join', function (data) {
      console.log('login request with data: ', data);
      User.findOne({username: data.username}).exec().then( user => {
        console.log(user, data.username);
        
        user.status = 'online';
        user.socketId=socket.id;
        _.each(app.sockets, socketId => {
          io.to(socketId).emit("newUserJoined",user);
        })
        //socket.broadcast.emit('newUserJoined',user);
        return user.save();
        

      });
    });

    socket.on('message', function (data) {
      User.findOne({username: data.to}).exec().then( user =>{
        if(user){
          io.to(user.socketId).emit('message',data);
        }
      });
      
    });

    socket.on('leave', function (data) {
      console.log(data);
      User.findOne({username: data.username}).exec().then( user => {
        console.log(user, data.username);
        user.status = 'offline';
        user.socketId='';
        _.each(app.sockets, socketId => {
          io.to(socketId).emit('newUserLeaved',user);
        })
        //socket.broadcast.emit('newUserLeaved',user);
        return user.save();
        

      });
    });
  });

  // app.get('/sockets', function (req, res) {
  //   res.send({sockets: app.sockets, connections: app.connections});
  // });
};
