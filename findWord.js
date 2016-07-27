var request = require('request')







request(options, callback);



function findWord(word,callback){

    var docs = {};
    docs.word = word;

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
      console.log(wow);
      docs.mean = wow;
    }
    }
    callback();
  })
    callback(docs)
}

exports.findWord = findWord;
