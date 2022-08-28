const formElement = document.getElementById('todo-form')
const inputElement = document.getElementById('todo-input')
const todoItemsElement = document.getElementById('todo-items')

formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const todoItemElement = document.createElement('li');
    todoItemElement.innerHTML = inputElement.value


    todoItemElement.addEventListener('click', () => {
        todoItemElement.classList.toggle('complete')
    })

    todoItemElement.addEventListener('contextmenu', (event) => {
        event.preventDefault()
        todoItemElement.remove()
    })


    todoItemsElement.append(todoItemElement)
})