const questions = [
    {
        'que': 'Which language is a markup language?',
        'a': 'Html',
        'b': 'Css',
        'c': 'Javascript',
        'd': 'Php',
        'correct': 'a'
    },
    {
        'que': 'When was JavaScript invented?',
        'a': '1996',
        'b': '1995',
        'c': '1994',
        'd': 'None',
        'correct': 'b'
    },
    {
        'que': 'What does CSS stand for?',
        'a': 'Hyper Text Markup Language',
        'b': 'Cascading Style Sheet',
        'c': 'JavaScript Object Notation',
        'd': 'Helicopters Terminals',
        'correct': 'b'
    }
];

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;
let quesbox;
let optionInputs;
let submitButton;

// Function to load questions dynamically
const loadQuestions = () => {
    if (index === total) {
        endQuiz();
        return;
    }
    reset();
    const data = questions[index];
    quesbox.innerText = `${index + 1}) ${data.que}`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;

    // Change the button text to "Submit Quiz" on the last question
    if (index === total - 1) {
        submitButton.innerText = "Submit Quiz";
    } else {
        submitButton.innerText = "Next Question";
    }
}

// Function to submit the current answer and load the next question
const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer();
    if (ans === data.correct) {
        right++;
    } else {
        wrong++;
    }
    index++;
    loadQuestions();
    return;
}

// Function to get the selected answer
const getAnswer = () => {
    let answer;
    optionInputs.forEach((input) => {
        if (input.checked) {
            answer = input.value;
        }
    });
    return answer;
}

// Function to reset the radio buttons
const reset = () => {
    optionInputs.forEach((input) => {
        input.checked = false;
    });
}

// Function to end the quiz and display the result with a "Start Again" button
const endQuiz = () => {
    document.querySelector("#box").innerHTML = `
    <div class='endquiz'>
        <h2>Thanks for playing the quiz!</h2>
        <h2>${right}/${total} are correct.</h2>
        <button id="start-again" class="start-again">Start Again</button>
    </div>
    `;

    // Add event listener for "Start Again" button
    document.querySelector("#start-again").addEventListener("click", startAgain);
}

// Function to restart the quiz from the beginning
const startAgain = () => {
    index = 0;
    right = 0;
    wrong = 0;

    // Restore the quiz structure dynamically
    document.querySelector("#box").innerHTML = `
    <h2 id="quebox"></h2>
    <div class="rows">
        <input id="Option1" class="options" type="radio" name="quiz" value="a"/>
        <label id="Option1">Option1</label>
    </div>
    <div class="rows">
        <input id="Option2" type="radio" class="options" name="quiz" value="b"/>
        <label id="Option2">Option2</label>
    </div>
    <div class="rows">
        <input id="Option3" type="radio" class="options" name="quiz" value="c"/>
        <label id="Option3">Option3</label>
    </div>
    <div class="rows">
        <input id="Option4" type="radio" class="options" name="quiz" value="d"/>
        <label id="Option4">Option4</label>
    </div>
    <button id="submit">Next Question</button>
    `;

    // Re-select option inputs and submit button after quiz reset
    quesbox = document.querySelector("#quebox");
    optionInputs = document.querySelectorAll(".options");
    submitButton = document.querySelector("#submit");

    // Re-assign event listeners and reload the first question
    submitButton.addEventListener("click", submitQuiz);
    loadQuestions();
}

// Add event listener for the submit button to load the next question or submit the quiz
document.addEventListener('DOMContentLoaded', () => {
    quesbox = document.querySelector("#quebox");
    optionInputs = document.querySelectorAll(".options");
    submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", submitQuiz);
    loadQuestions();
});
