let currentQuestion = 0;
let correctAnswers = 0;
const questions = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Joe Biden",
        d: "Mihai Andrei",
        correct: "c",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];


function showQuestion(index) {
    const question = questions[index];
    if (!question) {
        return
    }

    const questionTitleElement = document.getElementById('question_title');
    const aLabelElement = document.getElementById('a_label');
    const bLabelElement = document.getElementById('b_label');
    const cLabelElement = document.getElementById('c_label');
    const dLabelElement = document.getElementById('d_label');
    aLabelElement.innerText = question.a;
    bLabelElement.innerText = question.b;
    cLabelElement.innerText = question.c;
    dLabelElement.innerText = question.d;
    questionTitleElement.innerText = question.question;
}

function addEventToSubmit() {
    const submitElement = document.getElementById('submit');
    submitElement.addEventListener('click', (event) => {
        answer();

        if (currentQuestion < questions.length - 1) {
            currentQuestion++
            showQuestion(currentQuestion)
        } else{
            showResult()
        }

    })
}


function answer() {
    if (!hasAnswered()) {
        alert('Please select your answer!');
        return;
    }

    if (currentQuestion > currentQuestion.length - 1) {
        return;
    }

    if (verifyAnswer(questions[currentQuestion])) {
        correctAnswers++;
    }

    resetOptions();
}

function showResult() {
    const questionsContainerElement = document.getElementById('quiz_content');
    questionsContainerElement.innerHTML = `<div class='quiz_result'> You Answered <strong>${correctAnswers}</strong> out of  ${questions.length} </div>`
}

function verifyAnswer(question) {
    const options = document.getElementsByName('option');
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        if (element.checked && element.value == question.correct) {
            return true;
        }
    }
    return false;
}

function resetOptions() {
    const options = document.getElementsByName('option');
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        element.checked = false;
    }
}

function hasAnswered() {
    const options = document.getElementsByName('option');
    for (let i = 0; i < options.length; i++) {
        const element = options[i];
        if (element.checked) {
            return true;
        }
    }
    return false;
}

showQuestion(currentQuestion);
addEventToSubmit();

