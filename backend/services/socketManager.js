module.exports = function(server){

    var io= require('socket.io').listen(server);

    io.sockets.on('connection', function(socket){
        console.log('new socket connected');


        socket.on('disconnect', function(){
            console.log('disconnected socket');
        });

        
        socket.on('joinChannel', function(data){
            console.log('New user Joined:' ,JSON.stringify(data));
            //app.connections[socket.id]= data;
            socket.join(data.roomName);
        });

        socket.on('message', function(msg){
            console.log(msg);
            io.to(msg.room).emit('message', msg);
        });
    });











}