const notesElement = document.querySelector('.notes')
const editBtnElement = document.querySelector('.edit')
const deleteBtnElement = document.querySelector('.delete')
const mainElement = document.querySelector('.main')
const textAreaElement = document.querySelector('textarea')

editBtnElement.addEventListener('click', () => {
    mainElement.classList.toggle('hidden')
    textAreaElement.classList.toggle('hidden')
}); 

textAreaElement.addEventListener('input', (event) => {
    const value = event.target.value;
    mainElement.innerHTML = marked.parse(value)
})