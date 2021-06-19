const {MongoClient} = require('mongodb')

dbConnection = (cb)=>{
    MongoClient.connect(process.env.dbURL,{},(err,client)=>{
        if(err) return cb(false)
        const myDB = client.db(process.env.dbName)
        cb(myDB)
    })
}

module.exports = dbConnection