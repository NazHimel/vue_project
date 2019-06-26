module.exports = function(server){

    var io= require('socket.io').listen(server);

    io.sockets.on('connection', function(socket){
        console.log('new socket connected');


        socket.on('disconnect', function(){
            console.log('disconnected socket');
        });

        socket.on('message', function(msg){
            console.log(msg);
        });
        socket.emit('mess', 'hi');
    });











}