const fs = require('fs')
let resData = {
    titlePage:"",
    err:false,
    data:null
}

let getAllData = ()=>{
    try{
        data = JSON.parse(fs.readFileSync('allTasks.json').toString())
    }catch(e){
        data = [] 
    }
    return  data
}

let showAllTasks = (req,res)=>{
    try{
        resData.titlePage="Home Page"
        resData.data = JSON.parse(fs.readFileSync('allTasks.json').toString())
        resData.headers = Object.keys(resData.data[0])
    }catch(e){
        resData.titlePage = "Home Page"
        resData.data      = [] 
    }
    res.render('home',{resData})
}

let saveAllData = (allData)=>{
    try{
        fs.writeFileSync('allTasks.json',JSON.stringify(allData)) 
    }catch(e){
        fs.writeFileSync('allTasks.json','[]') 
    }
}

showTaskForm = (req,res)=>{
    res.render('tasks')
}
addTaskGet = (req,res)=>{
    res.render('addTask')
}
addTaskPost = (req,res)=>{
    if(req.body.title != '' && req.body.content != ''){
        let allData = getAllData()
        console.log(allData)
        console.log(typeof allData)
        let data = {
            id: allData.length == 0 ? 1 : allData[allData.length-1].id+1,
            title: req.body.title,
            content: req.body.content,
            status : true
        }
        allData.push(data)
        saveAllData(allData)
        res.redirect('/')
    }
}
editPost = (req,res)=>{
    console.log(req.body)
    if(req.body != ''){
        //console.log(req.body)
        let allData = getAllData()
        let indx = allData.findIndex(e=>e.id==parseInt(req.body.id))
        //console.log(req.body.id)
        let data = {
            id : allData[indx].id,
            title: req.body.title,
            content:req.body.content,
            status :allData[indx].status
        }
        allData[indx] = data
        saveAllData(allData)
        res.redirect('/')
    }
}

editGet = (req,res)=>{
    if(req.query.id != ''){
        let allData = getAllData()
        let indx = allData.findIndex(e=>e.id==req.query.id)
        if(indx == -1){
            resData.err = true
            resData.titlePage = "Edit Page"
            res.render("edit",{resData})
        }
        else{
            const data = getAllData()
            resData.data = data[indx]
            resData.titlePage = "Edit Page"
            res.render("edit",{resData})
        }
    }else{
        resData.err = true
        resData.titlePage = "Edit Page"
        res.render("edit",{resData})
    }
}

deleteTask = (req,res)=>{
    let allData = getAllData()
    let indx = allData.findIndex(e=>{console.log(e)
        return e.id==req.body.id
    })
    console.log(indx)
    if(indx == -1){
        resData.err = true
    }
    else{
        allData.splice(indx,1)
        saveAllData(allData)
    }
    res.redirect('/')
}

let showTask = (req,res)=>{
    try{
        resData.titlePage="Show Task Page"
        console.log(req.params)
        const id = parseInt(req.params.id)
        const data = getAllData()
        let indx = data.findIndex(e=>{console.log(e)
            return e.id==id
        })
        resData.data = data[indx]
        console.log(data)
    }catch(e){
        resData.titlePage = "Home Page"
        resData.data      = [] 
    }
    res.render('showTask',{resData})
}

changeStatus = (req,res)=>{
    if(req.body.id != ''){
        let allData = getAllData()
        let indx = allData.findIndex(e=>{console.log(e)
            return e.id==req.body.id
        })
        console.log(indx)
        if(indx == -1){
            resData.err = true
        }
        else{
            console.log(allData[indx].status)
            allData[indx].status == true ? allData[indx].status = false : allData[indx].status = true
        }
        saveAllData(allData)
        res.redirect('/')
    }
}

module.exports ={
    addTaskGet,
    addTaskPost,
    showAllTasks,
    editPost,
    editGet,
    deleteTask,
    showTask,
    changeStatus
}