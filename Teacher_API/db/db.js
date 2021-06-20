const mongoose = require('mongoose')
mongoose.connect(process.env.dbURL,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// const mongoose = require('mongoose')
// let dbConnection = async()=>{await mongoose.connect(process.env.dbURL,{
//     useCreateIndex:true,
//     useFindAndModify:false,
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// })}

// module.exports = dbConnection