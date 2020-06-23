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
let questionsArr = [
  {
    title: "Which element is used to provide title of the page?",
    options: ["heading", "head", "title", "h1"],
    isCorrect: 2
  },
  {
    title: "Which HTML element is used for displaying the biggest heading?",
      options: ["h1", "h3", "h6", "h7"],
    isCorrect: 0
  },
  {
      title: "Which element is used to emphasize text?",
      options: ["i", "em", "itali", "italics"],
    isCorrect: 1
  },
  {
      title: "How many heading elements are there in HTML5?",
      options: ["1", "3", "6", "7"],
    isCorrect: 2
  },
  {
      title: "Which tag is used to link pages?",
      options: ["link", "a", "href", "ref"],
    isCorrect: 0
  }
];
let questionsArrMapped = questionsArr.map(question => new Question(question.title, question.options, question.isCorrect))
    
    

let question = new Question();
let questionThree = new Question();
let questionFour = new Question();
let questionFive = new Question();
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
let tbody = document.querySelector("tbody");
let tfoot = document.querySelector("tfoot");
let table = document.querySelector(".table");
let resultText = document.querySelector(".result-text");
let totalCorrect = document.querySelector(".total-correct");
let totalWrong = document.querySelector(".total-wrong");
let counterCorrect = 0;
let counterWrong = 0;


class Quiz {
    constructor(rootElm, nextElm, questions) {
        this.questions = questions;
        this.rootElm = rootElm;
        this.nextElm = nextElm;
        this.activeQuestionIndex = localStorage.getItem("quiz")
          ? JSON.parse(localStorage.getItem("quiz"))
          : 0;
        this.score = 0;
    }
    nextQuestion(activeQuestionIndex, userSelectedAns) {
        // console.log("index", this.questions[this.activeQuestionIndex].title)
        errorMsg.innerText = "";
        // table.style.display = "none";
        

        let tr = document.createElement("tr");
        let td1 = document.createElement("td")
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        td1.innerText = this.questions[this.activeQuestionIndex].title;
        td2.innerText = this.questions[this.activeQuestionIndex].getCorrectAnswer();
        td3.innerText = userSelectedAns;
        
        
        if(td2.innerText === td3.innerText) {
            counterCorrect++;
            // console.log("counter", counter)
            let correct = document.createElement("i");
            correct.className = "far fa-check-circle";
            td4.append(correct);
            // console.log(td4)
        } else {
            counterWrong++;
            let wrong = document.createElement("i");
            wrong.className = "far fa-times-circle";
            td4.append(wrong);
            // console.log(td4)
        }

            
        
        tbody.append(tr);
        tr.append(td1, td2, td3,td4);
        totalCorrect.innerText = `${counterCorrect}`;
        totalWrong.innerText = `${counterWrong}`
        
        

        // displayScore.innerText = "";
        // localStorage.getItem("todos")
        //     ? JSON.parse(localStorage.getItem("todos"))
        //     : [];
        window.addEventListener("load", (event) => {
            // console.log("loaded");
            this.activeQuestionIndex = localStorage.getItem("quiz")
            ? JSON.parse(localStorage.getItem("quiz"))
            : activeQuestionIndex + 1;
            // console.log(this.activeQuestionIndex)
            // if (this.activeQuestionIndex >= this.questions.length) {
            //     this.displayResult();
                
            //     return;
            // }
            // this.rootElm.innerHTML = this.questions[
            //     this.activeQuestionIndex
            // ].createUI(this.activeQuestionIndex + 1, this.questions);
            // let progress = document.querySelector("progress");
            // progress.value = progress.value * (this.activeQuestionIndex + 1);
            let quiz = new Quiz(root, nextBtn, questionsArrMapped);
            quiz.rootUI(0.25)
        });
        // this.activeQuestionIndex = localStorage.getItem("quiz") ? JSON.parse(localStorage.getItem("quiz")) : activeQuestionIndex + 1;
        this.activeQuestionIndex = this.activeQuestionIndex+1;
        localStorage.setItem("quiz", JSON.stringify(this.activeQuestionIndex))
        if (this.activeQuestionIndex >= this.questions.length) {
            this.displayResult();
           
            return;
        }
        this.rootElm.innerHTML = this.questions[
          this.activeQuestionIndex
        ].createUI(this.activeQuestionIndex + 1, this.questions);
        let progress = document.querySelector("progress")
        progress.value = progress.value * (this.activeQuestionIndex+1);


    }
    displayResult() {

        table.style.display = "block";
        this.rootElm.style.display = "none";
        this.nextElm.style.display = "none";
        displayScore.innerText = `Score: ${this.score}`;
        if (this.score <= 1) {
            comment.innerText = "Poor!! You need to Work Hard!!";
            comment.style.color = "red";
        } else if (this.score > 1 && this.score < 3) {
            comment.innerText = "Good!! But need to go through the Concepts thoroughly!!"
            comment.style.color = "rgb(243, 210, 63)";
        } else {
            comment.innerText = "Excellent!! Keep up the Good Work!!"
            comment.style.color = "green";
        }
        resultText.style.display = "block";
        resultText.innerText = "Result of The Quiz"
        restartBtn.style.display = "block";
        restartBtn.innerText = "Retake the Quiz"
        restartBtn.addEventListener("click", restartFn)
    }
    rootUI(negativeMarks = 0) {
        this.rootElm.style.display = "block";
        this.nextElm.style.display = "block";
       
        this.nextElm.addEventListener("click", () => {
            let inputs = document.querySelectorAll("input");
            let selectedInput = [...inputs].filter((input) => {
                return input.checked
            });
            if (!selectedInput[0]) {
                errorMsg.innerText = "Select an Answer to go forward!";
                return;
            }
            // console.log(this.questions, this.activeQuestionIndex)
            const currentQuestion = this.questions[this.activeQuestionIndex];
            // console.log(currentQuestion.isCorrect())
            
            if (currentQuestion.isCorrect(selectedInput[0].value)) {
                this.score++;
            } else {
                this.score = this.score - negativeMarks;
            }
            this.nextQuestion(this.activeQuestionIndex, selectedInput[0].value)
        });
        
        
        this.rootElm.innerHTML = this.questions[
          this.activeQuestionIndex
        ].createUI(this.activeQuestionIndex + 1, this.questions);
        resultText.style.display = "none";
        restartBtn.style.display = "none";
        displayScore.innerText = "";
        comment.innerText = "";
        table.style.display = "none";
    }
}

let quiz = new Quiz(root, nextBtn, questionsArrMapped);
    quiz.rootUI(0.25); 

    function restartFn() {
        let quiz = new Quiz(root, nextBtn, questionsArrMapped);
        quiz.rootUI(0.25); 
        tbody.innerHTML = "";
    }
    

// let tdfoot1 = document.createElement("td");
// let tdfoot2 = document.createElement("td");
// tdfoot1.innerText = "Total Correct";
// tdfoot2.innerText =
//     tfoot.append(tdfoot1);