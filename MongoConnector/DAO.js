var mongo = require('mongodb').MongoClient
var db_Config = require('./Conf')
var soc =  require('../mysocketio')

function find(filter,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var parrots = db.collection(db_Config.col)
    parrots.find(filter).toArray(function(err, docs) {
      if (err) throw err
      db.close()
      callback(docs)})
})
}

function find_sort_limit(filter,sortOP,limitOP,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var parrots = db.collection(db_Config.col)
    parrots.find(filter).sort(sortOP).limit(limitOP).toArray(function(err, docs) {
      if (err) throw err
      db.close()
      callback(docs)})
})
}

function insert(query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var parrots = db.collection(db_Config.col)
    parrots.insert(query,function(err) {
      if (err) throw err
      db.close()
    })
})
}

function update(filter,query,callback){
  mongo.connect(db_Config.url,function(err,db){
    if (err) throw err
    var parrots = db.collection(db_Config.col)
    parrots.update(filter,query,function(err) {
      if (err) throw err
      db.close()}
    )
})
}


exports.find = find;
exports.insert = insert;
exports.update = update;
exports.find_sort_limit = find_sort_limit;
