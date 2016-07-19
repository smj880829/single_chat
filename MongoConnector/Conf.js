var ip = "mongodb://ec2-54-238-255-185.ap-northeast-1.compute.amazonaws.com"
var port = 27017
var db = "single_chat"
var col = "chat_log"
var url = ip + ":" + port + "/" + db
exports.url = url
exports.col = col
