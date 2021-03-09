//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listner
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo)


//Functions
 
function addTodo (event) {
    //Prevent form from submitting
    event.preventDefault()
    //Todo DIV creation with
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    //Create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //Add Todo to localStrorage
    saveLocalTodos(todoInput.value)
    

    //Check Mark Button
    const complitedButton = document.createElement('button')
    complitedButton.innerHTML = '<i class="fas fa-check"></i>'
    complitedButton.classList.add('complete-btn')
    todoDiv.appendChild(complitedButton)

    //Check Trash Button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    //Append TodoDiv

    todoList.appendChild(todoDiv)

    //Clear Todo input Value
    todoInput.value = ''

}

function deleteTodo (e) {
    const item = e.target

    //Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement

        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function() {
            todo.remove()
        })
    }

    //Check Mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}
 
function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })
}


function saveLocalTodos (todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}


function getTodos () {
    let todos
    
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    
    todos.forEach( function (todo) {
            //Todo DIV creation with
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        //Create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        //Check Mark Button
        const complitedButton = document.createElement('button')
        complitedButton.innerHTML = '<i class="fas fa-check"></i>'
        complitedButton.classList.add('complete-btn')
        todoDiv.appendChild(complitedButton)

        //Check Trash Button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        //Append TodoDiv

        todoList.appendChild(todoDiv)
    })
}
//Remove from localStorage

function removeLocalTodos(todo) {
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}