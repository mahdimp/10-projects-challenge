
const addButtonElement = document.getElementById('add-button')



addButtonElement.addEventListener('click', () => {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main hidden">
    </div>
    <textarea></textarea>
    `;

    const notesElement = note.querySelector('.notes');
    const editBtnElement = note.querySelector('.edit');
    const deleteBtnElement = note.querySelector('.delete');
    const mainElement = note.querySelector('.main');
    const textAreaElement = note.querySelector('textarea');


    editBtnElement.addEventListener('click', () => {
        mainElement.classList.toggle('hidden');
        textAreaElement.classList.toggle('hidden');
    });

    textAreaElement.addEventListener('input', (event) => {
        const value = event.target.value;
        mainElement.innerHTML = marked.parse(value);
    })

    deleteBtnElement.addEventListener('click', () => {
        note.remove();
    })

    document.body.appendChild(note);
})

