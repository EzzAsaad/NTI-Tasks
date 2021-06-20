const mongoose = require('mongoose')
const validator = require('validator')

const Teacher = mongoose.model('Teachers',{
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        match:/\w+/        
    },
    salary:{
        type:Number,
        required:true,
        match:/\d+/        
    },
    class:{
        type:String,
        required:true,
        trim:true,
        match:/\w+/        
    },
})

module.exports = Teacher