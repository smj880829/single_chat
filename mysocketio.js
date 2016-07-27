var io =  require('socket.io')();
var db = require('./MongoConnector/DAO')
var conf = require('./MongoConnector/Conf')
var request = require('request')

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
            var docs = {};
            docs.word = word[i];

            var url = 'http://dic.daum.net/search.do?q='

          request(url+word, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            //console.log(body) // Show the HTML for the Google homepage.
            var temp = body.split('<ul class=\"list_search\">')

            var flg = 1;
            var j = 0;
            var wow = "";

            if(temp.length > 1){
                          var temp2 = temp[1].split('</ul>')

                          while(j < temp2[0].length)
                          {
                                  if (temp2[0].charAt(j) == '<'){
                                      flg = 0;
                                  }
                                  else if( temp2[0].charAt(j) == '>'){
                                    flg = 1;
                                    j = j+1;
                                    continue
                                  }

                                  if(flg == 0){
                                      j = j + 1;
                                      continue
                                  }
                                  else if( flg == 1 && temp2[0].charAt(j) != '\t' && temp2[0].charAt(j) != '\n'){
                                      wow = wow + temp2[0].charAt(j);
                                  }
                                  j = j + 1;
                          }
            }
        }
      result.push(docs );
    })

      for(var i in result)
      {
        console.log(result[i].word);
        console.log(result[i].mean);
      }
      socket.emit('word_result', result);
  });
})
