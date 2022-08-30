const formElement = document.getElementById('todo-form');
const inputElement = document.getElementById('todo-input');
const todoItemsElement = document.getElementById('todo-items');

const todoItems = JSON.parse(localStorage.getItem('todo-items'))
if(todoItems){
    todoItems.forEach(todoItem => addTodo(todoItem))
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    addTodo();
    updateLocalStorage();
})

function addTodo(todo = null){
    const todoItemElement = document.createElement('li');
    todoItemElement.innerHTML = todo && todo.text || inputElement.value

    if(todo && todo.complete){
        todoItemElement.classList.add('complete')
    }

    todoItemElement.addEventListener('click', () => {
        todoItemElement.classList.toggle('complete')
        updateLocalStorage();
    })

    todoItemElement.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        todoItemElement.remove();
        updateLocalStorage();
    })

    inputElement.value = ''
    todoItemsElement.append(todoItemElement)
}

function updateLocalStorage() {
    const todoElements = document.querySelectorAll('li')
    if (!todoElements) {
        return;
    }

    const todoItems = Array.from(todoElements)
        .map(
            (totoElement) => ({
                text: totoElement.innerText,
                complete: totoElement.classList.contains('complete')
            })
        );
    localStorage.setItem('todo-items', JSON.stringify(todoItems))
}