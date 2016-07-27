var io =  require('socket.io')();
var db = require('./MongoConnector/DAO')
var conf = require('./MongoConnector/Conf')
var fw = require('./findWord')

module.exports = function(options) {
  io.attach(options,{origins:conf.ip +':* http://' + conf.ip +':*'});
  //io.attach(options);
};

io.on('connection', function (socket) {
    console.log('socket connect');
  socket.emit('wow', { hello: 'world' });  //socket.emit('messages', 'Hello from server');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  io.on('wow', function (socket) {
      socket.emit("wow",{"msg":"123"})
  })

  socket.on('event', function(data){
    console.log(data);
  });

  socket.on('insert_chatlog', function(data){
    data.insert_time = new Date()
    db.insert(data,function(re){

    })
    //socket.broadcast.emit('replace_chatlog');

    socket.broadcast.emit('new_chat_log', data);

  })

  socket.on('init_chat_log', function(data){
    db.find_sort_limit({},{'insert_time':-1},10,function(re){
      socket.emit('chat_logs', re);
    })
  });

  socket.on('find_chatlog', function(data){
    db.find_sort_limit({},{'insert_time':-1},10,function(re){
      socket.emit('chat_logs', re);
    })
  })
// Word
  socket.on('send_sentence', function(data){
      data.replace(',',' ')
      data.replace('.',' ')
      var words = data.split(' ')
      var result = new Array();
      for(var i in words)
      {
        fw.findWord(words[i],function(re){
          result.push(re );
        })
      }

      socket.emit('word_result', result);
  });
})
