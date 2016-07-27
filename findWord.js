var request = require('request')

function findWord(word,callback){
    var docs = {};
    docs.word = word;

    var url = 'http://dic.daum.net/search.do?q='

  request(url+word, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
    var temp = body.split('<ul class=\"list_search\">')

    var flg = 1;
    var j = 0;
    var wow = "";

    if(temp.length > 1){
      var temp2 = temp[1].split('</ul>')
      while(j < temp2[0].length)
      {
              if (temp2[0].indexof(j) == '<'){
                  flg = 0;
              }
              else if( temp2[0].indexif(j) == '>'){
                flg = 1;
                i = i+1;
                continue
              }

              if(flg == 0){
                  i = i + 1;
                  continue
              }
              else if( flg == 1 && temp2[i] != '\t' && temp2[i] != '\n'){
                  wow = wow + temp2[0].indexif(j);
              }

              j = j + 1;
      }
      docs.mean = wow;
    }
    }
  })
    callback(docs)
}

exports.findWord = findWord;
