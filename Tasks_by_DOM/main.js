document.querySelector('#startbtn').addEventListener('click',function(e){
    // console.log(e) // that return actual event obj
    // console.log(this) // that return selector
    if(this.textContent == 'Show Add Form') {
        document.querySelector('#AddForm').removeAttribute('hidden')
        this.textContent = 'Hide Add Form'
    }
    else{
        document.querySelector('#AddForm').setAttribute('hidden','')
        this.textContent = 'Show Add Form'
    }
})

const taskHeads = ["id", "title", "content", "taskType", "dueDate", "status", "important"]
let getAllData = ()=> JSON.parse(localStorage.getItem('tasks')) || []
let setAllData = (tasks)=> localStorage.setItem('tasks',JSON.stringify(tasks))
let addTask = (task)=>{
    tasks = getAllData()
    tasks.push(task)
    setAllData(tasks)
}
const createCustomElement = (parent, element, classes , attributes, text) => {
    const myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(classes != '') myElement.className = classes
    if(text != '') myElement.textContent = text
    if(attributes.length != 0){    
        attributes.forEach(attribute=>{
            myElement.setAttribute(attribute.attrName, attribute.attValue)
        })
    }
    return myElement
}


/* Add Task Start*/
let tasks = getAllData()
document.querySelector('#addTask').addEventListener('submit', function(e){
    e.preventDefault()
    let btnsubmit = document.querySelector('#btnsubmit').textContent
    if(btnsubmit == 'Submit'){
        addNewTask(
            this.elements.title.value,
            this.elements.content.value,
            this.elements.taskType.value,
            this.elements.dueDate.value,
            this.elements.status.value,
            this.elements.important.value
        )
        this.reset()
        drawTasks()
    }
    
})
/* Add Task End*/

/* Show Tasks Start*/
let drawTasks = function (){
    allTasks = document.querySelector('#allTasks')
    allTasks.innerHTML =''
   
    rowContainer = createCustomElement(allTasks, 'div', 'row', [], '')
    tasks.forEach((task,i)=>{
        // drawTask(task)
        taskDiv = createCustomElement(rowContainer, 'div', 'col-4', [], '')
        innerDiv = createCustomElement(taskDiv, 'div', 'mt-4 alert-success p-3', [], '')
        taskHeads.forEach(h=>{
            h5 = createCustomElement(innerDiv, "h5", "", [], task[h]===''?`${h} : Empty`:`${h} : ${task[h]}`)
        })
        delBtn = createCustomElement(innerDiv, 'button', 'ml-5 btn btn-danger c', [], 'delete')
        delBtn.addEventListener('click', function(e){
            deleteTask(tasks[i].id)
            drawTasks()
        })
        editBtn = createCustomElement(innerDiv, 'button', ' btn btn-primary c', [], 'Edit')
        editBtn.addEventListener('click', function(e){
            tasks = getAllData()
            let temp = {}
            const submitbtn = document.querySelector('#btnsubmit').textContent = 'Edit'
            let addForm = document.querySelector('#addTask')
            addForm.elements.title.value = tasks[i]['title']
            addForm.elements.content.value = tasks[i]['content']
            addForm.elements.taskType.value = tasks[i]['taskType']
            addForm.elements.dueDate.value = tasks[i]['dueDate']
            addForm.elements.status.value = tasks[i]['status']
            addForm.elements.important.value = tasks[i]['important']
            
            document.querySelector('#addTask').addEventListener('submit',function(){
                taskHeads.forEach(head=>{
                    if(head == 'id')
                    {
                        temp[head] = tasks[i].id
                    }else{
                        temp[head] = addForm.elements[head].value
                    }
                    //console.log(head + temp[head])
                })
                console.log(temp)
                editTask(tasks[i].id,temp)
            })
            drawTasks()
            //console.log(temp)
            //editTask(tasks[i].id,temp)
        })
    })
}

/* Show Tasks End*/


// document.querySelector('#addTask').addEventListener('submit',function(e){
//     e.preventDefault()
//     console.log(localStorage.getItem('tasks').length)
//     // let task = {
//     //     id : localStorage.getItem(tasks).length == 0 ? 1 : localStorage.getItem(tasks).slice
//     // }
//     // addTask(JSON.stringify(task))
// })


/*
        CRUD Task Functions 
*/


const addNewTask = (_title,_content,_taskType,_dueDate,_status,_important)=>{
    const newTask = {
        id       : tasks.length==0? 1 : parseInt(tasks[tasks.length-1].id+1) ,
        title    : _title,
        content  : _content,
        taskType : _taskType,
        dueDate  : _dueDate,
        status   : _status,
        important: _important
    }
    tasks = getAllData()
    tasks.push(newTask)
    setAllData(tasks)
}

const showAllTasks = ()=>{
    const tasks = getAllData()
    tasks.forEach(task=>{
        taskHeads.forEach(h=>{
            console.log(task[h]===''?`${h} : Empty`:`${h} : ${task[h]}`)
        })
    })
}


const getSingleTaskIndex = (key)=>{
    const tasks = getAllData()
    return tasks.findIndex(task => task.id == key)
}

const editTask = (key,task) =>{
    const indexOfSingleTask = getSingleTaskIndex(key)
    if(indexOfSingleTask == -1) return console.log('There no Task with that key.')
    let tasks = getAllData()
    console.log(key+"asdas")
    taskHeads.forEach(h=>{
        if(h == 'id' || h == 'taskType') tasks[indexOfSingleTask][h] = parseInt(task[h])
        else tasks[indexOfSingleTask][h] = task[h]        
    })
    setAllData(tasks)
    drawTasks()
}


const deleteTask = (key)=>{
    const indexOfSingleTask = getSingleTaskIndex(key)
    if(indexOfSingleTask == -1) return console.log('There no Task with that key.')
    let tasks = getAllData()
    tasks.splice(indexOfSingleTask,indexOfSingleTask)
    setAllData(tasks)
    drawTasks()
    //location.reload()
}

//addNewTask("kase","kase","kase","kase","kase","kase")
//showAllTasks()
//console.log(getSingleTaskIndex(14))
// editTask(55,{
//     id       : 55,
//     title    : "test",
//     content  : "test",
//     taskType : "test",
//     dueDate  : "test",
//     status   : "test",
//     important: "test"
// })

//deleteTask(10)
drawTasks()