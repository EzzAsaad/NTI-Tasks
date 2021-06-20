const Teacher = require("../models/teacher.model")
const teacherModel = require("../models/teacher.model")

register = async(req,res)=>{
    let data = req.body
    try{
        let teacher = new teacherModel(data)
        console.log(data)
        await teacher.save()
        res.send("Insertion is Done!")
    }catch(e){
        res.send(`There is Problem in Insertion process : ${e}` )
    }
}


all = async(req,res)=>{
    try{
        let all = await teacherModel.find({})
        console.log(all)
        res.send(all)
    }catch(e){
        res.send(`There is Problem in Insertion process : ${e}` )
    }
}

single = async (req,res)=>{
    let id = req.params.id
    try{
        let teacher = await teacherModel.find({_id:id})
        console.log(teacher)
        res.send(teacher)
    }catch(e){
        res.send(`There is Problem in Insertion process : ${e}` )
    }
}

let Delete = async (req,res)=>{
    let id = req.params.id
    try{
        let teacher = await teacherModel.deleteOne({_id:id})
        console.log(teacher)
        res.send("Deletion is Done")
    }catch(e){
        res.send(`There is Problem in Insertion process : ${e}` )
    }
}

let Update = async (req,res)=>{
    let id = req.params.id
    let data = req.body
    try{
        let teacher = await teacherModel.find({_id:id})
        let updateTeacher = await teacherModel.updateOne({_id:id},{
            name:data.name || teacher[0].name,
            salary:data.salary || teacher[0].salary,
            class:data.class ||teacher[0].class
        })
        console.log(updateTeacher)
        res.send("Update is Done")
    }catch(e){
        res.send(`There is Problem in Insertion process : ${e}` )
    }
}

module.exports = {
    register,
    all,
    single,
    Delete,
    Update
}