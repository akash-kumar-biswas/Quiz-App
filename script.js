const questions = [
    {
        question: "which html tag has no closing tag?",
        answers: [
            {text:"div", correct: false},
            {text:"button", correct: false},
            {text:"br", correct: true},
            {text:"script", correct: false},
        ]
    },
    
    {
        question: "which of the following is not  present of Java?",
        answers: [
            {text:"string", correct: false},
            {text:"array", correct: false},
            {text:"multimap", correct: false},
            {text:"pointer", correct: true},
        ]
    },

    {
        question: "Which of the following way is not correct to check wheather a number num is even or odd?",
        answers: [
            {text:"num % 2 ", correct: false},
            {text:"num>>1 & 1", correct: true},
            {text:"num & 1<<0", correct: false},
            {text:"num & 1", correct: false},
        ]
    },

    {
        question: "ভালোবাসা ভালোবাসে শুধুই তাকে, ভালবেসে ভালবাসাই বেঁধে যে রাখে..কোন মুভির উক্তি??",
        answers: [
            {text:"চিরদিনই তুমি যে আমার", correct: false},
            {text:"বেদের মেয়ে জোসনা", correct: false},
            {text:"নিঃশ্বাস আমার তুমি", correct: false},
            {text:"দুই পৃথিবী", correct: true},
        ]
    },

    {
        question: "বাংলাদেশের জাতীয় পাখির নাম কি??",
        answers: [
            {text:"দোয়েল", correct: true},
            {text:"পেঁচা", correct: false},
            {text:"ময়ূর", correct: false},
            {text:"কোকিল", correct: false},
        ]
    },
]

const questionEle = document.getElementById("question");
const ansButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");

let currQuesIndex = 0;
let score = 0;

function startQuiz(){
    currQuesIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQues();
}

function resetState(){
    nextButton.style.display = "none";
    while(ansButtons.firstChild){
        ansButtons.removeChild(ansButtons.firstChild);
    }
}

function selectAns(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(ansButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showQues(){
    resetState();
    let currQues = questions[currQuesIndex];
    let quesNo = currQuesIndex + 1;
    questionEle.innerHTML = quesNo + ". " + currQues.question;

    currQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAns);
    });
}

function showScore(){
    resetState();
    questionEle.innerHTML = `You Scored ${score} Out Of ${questions.length}!`;
    nextButton.innerHTML = "পুনরায় দাও!";
    nextButton.style.display = "block";
}

function handleNextBtn(){
    currQuesIndex++;
    if(currQuesIndex < questions.length){
        showQues();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currQuesIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
})
startQuiz();