// To-Do elements
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterSelector = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', modifyTodo);
filterSelector.addEventListener('change', filterTodo);

// Functions
function addTodo(event) {
    // Prevent the form from submitting
    event.preventDefault();

    // Prevent the creation of an empty To-Do 
    if(!todoInput.value) return

    // Create To-Do
    createTodo(todoInput.value);

    // Save To-Do on local storage
    saveLocalTodo(todoInput.value);

    // Resetting todoInput
    todoInput.value = '';
}

function createTodo(description) {
    // Create To-Do container (div)
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    // Create To-Do item (task description)
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.innerText = description;
    todoContainer.appendChild(todoItem);

    // Create completed button
    const completedBtn = document.createElement('button');
    completedBtn.classList.add('completed-btn');
    completedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todoContainer.appendChild(completedBtn);

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
    todoContainer.appendChild(removeBtn);

    // Put To-Do in To-Do list
    todoList.appendChild(todoContainer);
}

function modifyTodo(event) {
    // Element that user is hovering
    const target = event.target;
    // target's parent element
    const parent = target.parentElement;

    // Check To-Do as completed
    if(target.classList.contains('completed-btn')) { 
        parent.classList.toggle('completed-todo');
    } 
    
    // Remove To-Do
    if(target.classList.contains('remove-btn')) { 
        parent.classList.add('removed-todo');
        removeLocalTodo(parent);
        parent.addEventListener('transitionend', () => parent.remove());
    }
}

function filterTodo(event) {
    // Array with all To-Dos
    const todos = todoList.childNodes;

    // Filters
    todos.forEach((todo) => {
        switch(event.target.value) {
            case 'all':
                todo.style.display = 'flex';
            break;

            case 'completed':
                if(todo.classList.contains('completed-todo')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
            break;

            case 'uncompleted':
                if(!todo.classList.contains('completed-todo')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
            break; 
        }
    });
}

// Save To-Dos on local storage
function saveLocalTodo(todo) {
    let todos = checkLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Remove To-Dos on local storage
function removeLocalTodo(todo) {
    let todos = checkLocalStorage();
    console.log(todos);
    const todoDescription = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoDescription), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load all To-Dos from local storage
function loadTodos() {
    let todos = checkLocalStorage();
    todos.forEach((todo) => createTodo(todo));
}

// Check if has data on local storage, and if yes, return it
function checkLocalStorage() {
    let todos;

    if(!localStorage.getItem('todos')) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
}