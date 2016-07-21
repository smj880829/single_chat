var io =  require('socket.io')();
var db = require('./Mongoconnector/DAO')


module.exports = function(options) {
  io.attach(options,{origins:'ec2-54-249-39-95.ap-northeast-1.compute.amazonaws.com:* http://ec2-54-249-39-95.ap-northeast-1.compute.amazonaws.com:*'});
};

io.on('connection', function (socket) {
    console.log('socket connect');
  socket.emit('wow', { hello: 'world' });  //socket.emit('messages', 'Hello from server');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('insert_chatlog', function(data){
    data.insert_time = new Date()
    db.insert(data,function(re){

    })
    //socket.broadcast.emit('replace_chatlog');

    db.find_sort_limit({},{'insert_time':-1},10,function(re){
      socket.broadcast.emit('chat_logs', re);
    })
  })

  socket.on('find_chatlog', function(data){
    db.find_sort_limit({},{'insert_time':-1},10,function(re){
      socket.emit('chat_logs', re);
    })
  })
})
