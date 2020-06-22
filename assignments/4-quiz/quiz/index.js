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
  }

  // METHODS
  isCorrect(userAnswer) {
    return this.options[this.correctAnswerIndex] === userAnswer;
  }
  getCorrectAnswer() {
    return this.options[this.correctAnswerIndex];
  }
  createUI() {
    return `
        <form>
        <fieldset>
        <legend>${this.title}</legend>
        <div>
        ${this.options
        .map(
            option => `<input type="radio" class= "input" id="contactChoice1" name="${this.title}" value=${option}>
                
                <label for="contactChoice1">${option}</label>`
        )
        .join("")}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        </fieldset>
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

let nextBtn = document.querySelector(".btn");
let root = document.getElementById("root");

class Quiz {
  constructor(rootElm, nextElm, questions) {
    this.questions = questions;
    this.rootElm = rootElm;
    this.nextElm = nextElm;
    this.activeQuestionIndex = 0;
    this.score = 0;
  }
  nextQuestion(activeQuestionIndex) {
    
    let errorMsg = document.querySelector(".error")
    let displayScore = document.querySelector(".final-score");
    

    errorMsg.innerText = "";
    displayScore.innerText = "";
    console.log("index before click is", this.activeQuestionIndex);
    this.activeQuestionIndex = activeQuestionIndex + 1;
    // console.log(this.questions.length)
    console.log("index after click is", this.activeQuestionIndex)
    if(this.activeQuestionIndex >= 5) {
      root.style.display = "none";
      nextBtn.style.display = "none";
      displayScore.innerText = `final score is ${ this.score }`
      console.log(`final score is ${this.score}`);
      return;
      
    }
    this.rootElm.innerHTML = this.questions[
      this.activeQuestionIndex
    ].createUI();
    this.scoreUpdate(this.questions[this.activeQuestionIndex]);
  }
  
  rootUI() {
    this.nextElm.addEventListener("click", () => {
      let inputs = document.querySelectorAll("input");
      // let selectedInput = [...inputs].filter((input) => {
      //   return input.checked
      // });
      // selectedInput = String(...selectedInput);
      // console.log(selectedInput)

      // if (!selectedInput) {
      //   errorMsg.innerText = "cannot go ahead!";
      //   return;
      // }

      if (
        inputs[0].checked == false &&
        inputs[1].checked == false &&
        inputs[2].checked == false &&
        inputs[3].checked == false
      ) {
        
      }
      
      const currentQuestion = this.questions[this.activeQuestionIndex];

      if (currentQuestion.isCorrect(this.currentQuestionAns)) {
        // console.log(`${selectedInput.value}`)
        // if (currentQuestion.isCorrect(selectedInput.value)) {
        this.score++;
      } else {
        this.score--;
      }

      this.nextQuestion(this.activeQuestionIndex)
      
    });
    
    
    this.rootElm.innerHTML = this.questions[this.activeQuestionIndex].createUI();
    this.scoreUpdate(this.questions[this.activeQuestionIndex]);
   
  }
  scoreUpdate(currentQuestion) {
      let inputs = document.querySelectorAll("input")
   
      // let counter = 0
      inputs.forEach((input,index) => {
        // console.log(input.value,input.checked,index)
        if(input.checked=== true){
          console.dir(input)
        }
        input.addEventListener("click", (event) => {
          // console.log(input.value, input.checked, index);
          // this.rootUI()
          // console.dir(input)
          // counter++;
          // console.log("counter", counter)
          
          this.currentQuestionAns = event.target.value
        });
      });
      console.log("score", this.score);
    }
}

let quiz = new Quiz(root, nextBtn, [questionOne, questionTwo, questionThree, questionFour, questionFive]);
quiz.rootUI(); 
