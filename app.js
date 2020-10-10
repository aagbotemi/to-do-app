// select the the DOM
const todoForm = document.querySelector('.todo-form');
const todoInput = document.getElementById('todo-input');
const todoItemsList = document.getElementById('todo-items');
const errorMessage = document.getElementById('error');

let todos = [];

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input box current value
});

const addTodo = (item) => {
    if (item !== '') { // if item is empty
        // make a todo object, which has id, name, and completed properties
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        // then add it to todos array
        todos.push(todo);
        renderTodos(todos); // then renders them between <ul>

        todoInput.value = '';
        errorMessage.innerHTML = "";
    } else if (item == '') {
        errorMessage.innerHTML = "Please add your task";
    }
}

const renderTodos = (todos) => {
    todoItemsList.innerHTML = '';

    todos.forEach((item) => {
        const checked = item.completed ? 'checked': null;

        const li = document.createElement('li');
        li.setAttribute('id', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }
    
        li.innerHTML = `
            <input type="checkbox" id="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button"><i class="fas fa-trash-alt"></i></button>
        `;
        
        todoItemsList.append(li);
    });
}

const addToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');

    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}
getFromLocalStorage();

todoItemsList.addEventListener('click', (event) => {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a edit-button
    if (event.target.classList.contains('edit-button')) {
        // get id from data-key attribute's value of parent <li> where the edit-button is present
        editTodo(event.target.parentElement.getAttribute('data-key'));
    }

    // check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

// toggle the value to completed and not completed
const toggle = (id) => {
    todos.forEach((item) => {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

const deleteTodo = (id) => {
    todos = todos.filter((item) => {
        return item.id != id;
    });
    addToLocalStorage(todos);
}