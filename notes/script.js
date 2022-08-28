
const addButtonElement = document.getElementById('add-button')
const textValues = JSON.parse(localStorage.getItem('notes'));
textValues.forEach(textValue => addNote(textValue))



addButtonElement.addEventListener('click', () => {
    addNote()
})


function addNote(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    const textAreaHiddenClass =  text ? 'hidden' : '';
    const mainHiddenClass = text ? '' : 'hidden';

    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${mainHiddenClass}">
    </div>
    <textarea class="${textAreaHiddenClass}"></textarea>
    `;

    const editBtnElement = note.querySelector('.edit');
    const deleteBtnElement = note.querySelector('.delete');
    const mainElement = note.querySelector('.main');
    const textAreaElement = note.querySelector('textarea');

    if (text) {
        textAreaElement.value = text;
        mainElement.innerHTML = marked.parse(text);
    }

    editBtnElement.addEventListener('click', () => {
        mainElement.classList.toggle('hidden');
        textAreaElement.classList.toggle('hidden');
    });

    textAreaElement.addEventListener('input', (event) => {
        updateLocalStorage();
        const value = event.target.value;
        mainElement.innerHTML = marked.parse(value);
    })

    deleteBtnElement.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    })

    document.body.appendChild(note);
}

function updateLocalStorage() {
    const textareaElements = document.querySelectorAll('textarea')
    if (!textareaElements) {
        return;
    }

    const textValues = Array.from(textareaElements).map((textAreaElement) => textAreaElement.value)
    localStorage.setItem('notes', JSON.stringify(textValues))
}