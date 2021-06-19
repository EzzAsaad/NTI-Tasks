const dbConnection = require('../db/db')


showRegisterForm = (req,res)=>{
    res.render("register")
}

registeration = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[]
    }
    data = req.body
    if(data.username == "") resData.errors.push("username is reuired")
    if(data.password == "") resData.errors.push("Password is reuired")
    resData.pageTitle = "Registeration Page"
    //console.log(resData.errors)
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        if(resData.errors.length > 0) {
            res.render("error",resData)
            return
        }
        db.collection('users').insertOne(data)        
    })
    //res.render('all',resData)
    res.render("register")
}

showLoginForm = (req,res)=>{
    res.render('index')
}

login = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[]
    }
    data = req.body
    if(data.username == "") resData.errors.push("username is reuired")
    if(data.password == "") resData.errors.push("Password is reuired")
    resData.pageTitle = "Profile Page"
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        if(resData.errors.length > 0) {
            res.render("error",resData)
            return
        }
        db.collection('users').findOne({username:data.username},(err,user)=>{
            console.log(user)
            resData.data = user
            resData.data._id = JSON.stringify(resData.data._id)
            resData.headers = Object.keys(user)
            res.render('profile',{resData})
        })        
    })

}

editPost = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[]
    }
    data = req.body
    if(data.username == "") resData.errors.push("username is reuired")
    resData.pageTitle = "Edit Page"
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        if(resData.errors.length > 0) {
            res.render("error",resData)
            return
        }
        try{
            db.collection('users').updateOne({username:data.username},{
                $set : {"username":data.username,"password":data.password,
                "amount":parseInt(data.amount),"date":data.date,"location":data.location}
            })
        }catch(e){
            res.render("error",resData)
            return
        }
        
        res.redirect("/login")        
    })

}

editGet = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[]
    }
    data = req.params
    if(data.username == "") resData.errors.push("username is reuired")
    resData.pageTitle = "Edit Page"
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        if(resData.errors.length > 0) {
            res.render("error",resData)
            return
        }
        db.collection('users').findOne({username:data.username},(err,user)=>{
            console.log(user)
            resData.data = user
            resData.isEdit = true
            resData.data._id = JSON.stringify(resData.data._id)
            resData.headers = Object.keys(user)
            res.render('editandShow',{resData})
        })        
    })

}

deleteAccount = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[]
    }
    let username = req.params.username
    if(username == "") resData.errors.push("Invalid Path")
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        db.collection('users').deleteOne({username:username},(err,ress)=>{
            console.log(ress.result)
            if(ress.result.ok !=1)
            {
                resData.errors.push("Deletion not done")
                res.render("error",resData)
                return
            }
            else{
                res.redirect('/login')
            }
        })        
    })

}

showData = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[],
        isEdit :false
    }
    data = req.params
    if(data.username == "") resData.errors.push("username is reuired")
    resData.pageTitle = "Show Page"
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        if(resData.errors.length > 0) {
            res.render("error",resData)
            return
        }
        db.collection('users').findOne({username:data.username},(err,user)=>{
            console.log(user)
            resData.data = user
            resData.data._id = JSON.stringify(resData.data._id)
            resData.headers = Object.keys(user)
            res.render('editandShow',{resData})
        })        
    })
}


showProfile = (req,res)=>{
    let resData = {
        pageTitle : "",
        data:"",
        errors:[]
    }
    data = req.params
    if(data.username == "") resData.errors.push("username is reuired")
    resData.pageTitle = "Profile Page"
    dbConnection(db=>{
        if(!db){
            resData.errors.push("DataBase Error")
            console.log("Error")
        }
        if(resData.errors.length > 0) {
            res.render("error",resData)
            return
        }
        db.collection('users').findOne({username:data.username},(err,user)=>{
            console.log(user)
            resData.data = user
            resData.data._id = JSON.stringify(resData.data._id)
            resData.headers = Object.keys(user)
            res.render('profile',{resData})
        })        
    })
}

module.exports = {
    showRegisterForm,
    registeration,
    showLoginForm,
    login,
    deleteAccount,
    editGet,
    editPost,
    showData,
    showProfile
}