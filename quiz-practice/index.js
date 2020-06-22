// - Title of the question
//     - Options of the question
//         - Correct answer
// let radiobtn = document.querySelector(".input");

class Question {
    // DATA
    constructor(title, options, correctAnswerIndex) {
        this.title = title;
        this.options = options;
        this.correctAnswerIndex = correctAnswerIndex;
        this.id = 1;
    }

    // METHODS
    isCorrect(userAnswer) {
        return this.options[this.correctAnswerIndex] === userAnswer;
    }
    getCorrectAnswer() {
        return this.options[this.correctAnswerIndex];
    }
    createUI(index,questions) {
        console.log(index)
        return `
        <div>
            <div class="progress-bar">
                <p>Question: ${index}/${questions.length} </p>
                <progress value=20 max="100"></progress>
            </div>
        <form>
        <legend>${this.title}</legend>
        <div>
            ${this.options
              .map(
                option => `
                  <div class="option-list">
                                <input type="radio" class="toggle" id=${
                                  this.id
                                } name="option" value=${option}>
                                <label for=${this.id} class="label">
                                    <div class="options">
                                        <label for=${this
                                          .id++} class="text">${option}</label>
                                    </div>
                                </label>
                                </div>
                                `
              )
              .join("")}
        </div>
        
        </form>
        
        `;
    }
}

let questionOne = new Question(
    "Which element is used to provide title of the page?",
    ["heading", "head", "title", "h1"],
    2
);
let questionTwo = new Question(
    "Which HTML element is used for displaying the biggest heading?",
    ["h1", "h3", "h6", "h7"],
    0
);
let questionThree = new Question(
    "Which element is used to emphasize text?",
    ["i", "em", "itali", "italics"],
    1
);
let questionFour = new Question(
    "How many heading elements are there in HTML5?",
    ["1", "3", "6", "7"],
    2
);
let questionFive = new Question(
    "Which tag is used to link pages?",
    ["link", "a", "href", "ref"],
    0
);
// let questionSix = new Question(
//   "Which tag is used to link pages?",
//   ["link", "a", "href", "ref"],
//   0
// );
// let questionSeven = new Question(
//   "Which tag is used to link pages?",
//   ["link", "a", "href", "ref"],
//   0
// );
// let questionEight = new Question(
//   "Which tag is used to link pages?",
//   ["link", "a", "href", "ref"],
//   0
// );
// let questionNine = new Question(
//   "Which tag is used to link pages?",
//   ["link", "a", "href", "ref"],
//   0
// );
// let questionTen = new Question(
//   "Which tag is used to link pages?",
//   ["link", "a", "href", "ref"],
//   0
// );


let nextBtn = document.querySelector(".btn");
let root = document.getElementById("root");
let restartBtn = document.querySelector(".restart-btn");
let displayScore = document.querySelector(".final-score");
let errorMsg = document.querySelector(".error")
let optionsList = document.querySelector(".options")
let comment = document.querySelector(".comment")

class Quiz {
    constructor(rootElm, nextElm, questions) {
        this.questions = questions;
        this.rootElm = rootElm;
        this.nextElm = nextElm;
        this.activeQuestionIndex = 0;
        this.score = 0;
    }
    nextQuestion(activeQuestionIndex) {
        errorMsg.innerText = "";
        // console.log(errorMsg)
        displayScore.innerText = "";
        this.activeQuestionIndex = activeQuestionIndex + 1;
        if (this.activeQuestionIndex >= this.questions.length) {
            this.rootElm.style.display = "none";
            this.nextElm.style.display = "none";
            displayScore.innerText = `Score: ${this.score}`;
            if(this.score <= 1){
                comment.innerText = "Poor!! You need to Work Hard!!";
                comment.style.color = "red";
            }else if (this.score > 1 && this.score < 3){
                comment.innerText = "Good!! But need to go through the Concepts thoroughly!!"
                comment.style.color = "rgb(243, 210, 63)";
            }else {
                comment.innerText= "Excellent!! Keep up the Good Work!!"
                comment.style.color = "green";
            }
            restartBtn.style.display = "block";
            restartBtn.innerText = "Retake the Quiz"
            // console.log(this.questions[this.activeQuestionIndex])
            restartBtn.addEventListener("click", restartFn)

            

            // console.log(quiz)
            return;
        }
        this.rootElm.innerHTML = this.questions[
          this.activeQuestionIndex
        ].createUI(this.activeQuestionIndex + 1, this.questions);
        let progress = document.querySelector("progress")
        // console.log(this.activeQuestionIndex)
        progress.value = progress.value * (this.activeQuestionIndex+1);
        // console.log(progress.value)


    }
    // restartFn() {
        
    //     this.questions = [questionOne, questionTwo, questionThree, questionFour, questionFive];
    //     this.activeQuestionIndex = 0;
    //     // quiz.rootUI(); 
    //     // this.rootElm.innerHTML = this.questions[
    //     //     this.activeQuestionIndex
    //     // ].createUI(this.activeQuestionIndex + 1, this.questions);
    //     this.rootElm.innerHTML = this.questions[
    //         this.activeQuestionIndex
    //     ].createUI(this.activeQuestionIndex + 1, this.questions);
    //     restartBtn.style.display = "none";
    //     displayScore.innerText = "";
    //     comment.innerText = "";
    //     root.style.display = "block";
    //     nextBtn.style.display = "block";
    // }
    
    rootUI() {
        this.rootElm.style.display = "block";
        this.nextElm.style.display = "block"
        this.nextElm.addEventListener("click", () => {
            let inputs = document.querySelectorAll("input");
            let selectedInput = [...inputs].filter((input) => {
                return input.checked
            });
            // console.log("selectedInput",selectedInput[0], inputs)
            if (!selectedInput[0]) {
                errorMsg.innerText = "Select an Answer to go forward!";
                return;
            }
            console.log(this.questions, this.activeQuestionIndex)
            const currentQuestion = this.questions[this.activeQuestionIndex];
            if (currentQuestion.isCorrect(selectedInput[0].value)) {
                this.score++;
            } else {
                this.score--;
            }
            this.nextQuestion(this.activeQuestionIndex)
        });
        
        
        this.rootElm.innerHTML = this.questions[
          this.activeQuestionIndex
        ].createUI(this.activeQuestionIndex + 1, this.questions);
        restartBtn.style.display = "none";
        displayScore.innerText = "";
        comment.innerText = "";
        // console.log(optionsList)
        // optionsList.forEach(e => e.addEventListener("click", (event) => {
        //     console.log(event.target)
        //     event.target.style.backgroundColor = "blue"}))
        
    }
}

let quiz = new Quiz(root, nextBtn, [
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive
]);
    quiz.rootUI(); 

    function restartFn() {
        let quiz = new Quiz(root, nextBtn, [
            questionOne,
            questionTwo,
            questionThree,
            questionFour,
            questionFive
        ]);
        nextBtn.removeEventListener("click", () => { });
        quiz.rootUI(); 
        

    }
    
    // 1.if (
        //     inputs[0].checked == false &&
        //     inputs[1].checked == false &&
        //     inputs[2].checked == false &&
        //     inputs[3].checked == false
        // ) {
            // errorMsg.innerText = "cannot go ahead!";
            //   return;
            // }
            //2. scoreUpdate(currentQuestion) {
                //     let inputs = document.querySelectorAll("input")
                //     inputs.forEach((input, index) => {
                    //         if (input.checked === true) {
                        //         }
                        //         input.addEventListener("click", (event) => {
                            //             this.currentQuestionAns = event.target.value
                            //         });
                            //     });
                            // }
                            //3. this.scoreUpdate(this.questions[this.activeQuestionIndex]);
                            //4. this.scoreUpdate(this.questions[this.activeQuestionIndex]);
                            //5. if (currentQuestion.isCorrect(this.currentQuestionAns)) {
// questionSix,
//     questionSeven,
//     questionEight,
//     questionNine,
//     questionTen