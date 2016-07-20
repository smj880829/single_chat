var ip = "ec2-54-199-241-180.ap-northeast-1.compute.amazonaws.com"
var port = 27017
var db = "single_chat"
var col = "chat_log"
var url = "mongodb://" + ip + ":" + port + "/" + db
exports.url = url
exports.col = col
