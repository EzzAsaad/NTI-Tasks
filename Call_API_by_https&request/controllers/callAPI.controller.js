const https = require('https')
const request = require('request')
const URL = `https://jsonplaceholder.typicode.com/posts?_limit=10`


// anoth solution
// getData = (callback) =>{
//     https.get(URL,(resH)=>{
//         let data = ''

//         resH.on('data',(chunk)=>{
//             data += chunk
//         })

//         resH.on('end',()=>{
//             data = JSON.parse(data)
//             console.log(data)
//             return callback(false,data)
//         })
        
//     }).on('error',(error)=>{
//             console.log("error")
//             return callback(error,false)
//     })
// }

// callAPIHTTPS = (req,res)=>{
//     let resData = {
//         pageTitle :"Call by Https",
//         isHttps : true
//     }

//     data = getData((err,data)=>{
//         if(err){
//             resData.isError = true
//             resData.errors.push(error) 
//             console.log("error")
//             return res.render('index',resData)
//         }else{
//             resData.data = data
//             return res.render('index',{resData})
//         }
//     })
    
// }
//
callAPIHTTPS = (req,res)=>{
    let resData = {
        pageTitle :"Call by Https",
        isHttps : true
    }
    https.get(URL,(resH)=>{
        let data = ''

        resH.on('data',(chunk)=>{
            data += chunk
        })

        resH.on('end',()=>{            
            resData.data = JSON.parse(data)
            resData.headers = Object.keys(resData.data[0])
            console.log(resData.data)
        return res.render('index',{resData})
        })
        
    }).on('error',(error)=>{
            resData.isError = true
            resData.errors.push(error) 
            console.log("error")
            return res.render('index',{resData})
    })
}

callAPIREQUEST = (req,res)=>{
    let resData = {
        pageTitle :"Call by Request",
        isHttps : false,
        errors : []
    }
    request(URL,(error,responce,body)=>{
        if(error)
        {   resData.isError = true
            resData.errors.push(error) 
            console.log("error")
            return res.render('index',resData)
        }else{
            //console.log(body)
            body = JSON.parse(body)
            //console.log(body[0])
            resData.headers = Object.keys(body[0])
            resData.data = body
            return res.render('index',{resData})

        }
    })
}

module.exports = {
    callAPIHTTPS,
    callAPIREQUEST
}