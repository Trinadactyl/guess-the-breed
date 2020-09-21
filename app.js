'use strict';

//-------------Changes to make:------------------
//Click on title header to nagvigate to start page
//use legally obtained images with consistent dimensions 
//consistent button styles
//change font styles
//choose fun & user friendly color scheme
//Display silly messages at end of quiz based on user score
//add backgroung images and animations, and maybe sounds?
//add option for users to comment & send feedback
//add footer w/ my name & links to social media
//test code

const STORE = {
  questions: [
    null,
    {
      question: 'Choose the Mandrill',
      answers: [
        {src:'./pics/chacmaBaboon.jpg', name:'Chacma Baboon'},
        {src:'./pics/mandrill.jpg', name:'Mandrill'},
        {src:'./pics/kingColobus.jpg', name:'King Colobus'},
        {src:'./pics/capuchin.jpg', name:'Capuchin'},
      ],
      correctAnswer: 'Mandrill',
    },
    {
      question: 'Choose the Bald Ukari',
      answers: [
        {src:'./pics/rhesusMacaque.jpg', name:'Rhesus Macaque'},
        {src:'./pics/spiderMonkey.jpg', name:'Spider Monkey'},
        {src:'./pics/capuchin.jpg', name:'Capuchin'},
        {src:'./pics/baldUkari.jpg', name:'Bald Ukari'},
      ],
      correctAnswer: 'Bald Ukari',
    },
    {
      question: 'Pick the Japanese Macaque',
      answers: [
        {src:'./pics/rhesusMacaque.jpg', name:'Rhesus Macaque'},
        {src:'./pics/kingColobus.jpg', name:'Kink Colobus'},
        {src:'./pics/japaneseMacaque.jpg', name:'Japanese Macaque'},
        {src:'./pics/capuchin.jpg', name:'Capuchin'},
      ],
      correctAnswer: 'Japanese Macaque',
    },
    {
      question: 'Which one is the Vervet?',
      answers: [
        {src:'./pics/baldUkari.jpg', name:'Bald Ukari'},
        {src:'./pics/vervet.jpg', name:'Vervet'},
        {src:'./pics/blueMonkey.jpg', name:'Blue Monkey'},
        {src:'./pics/capuchin.jpg', name:'Capuchin'},
      ],
      correctAnswer: 'Vervet',
    },
    {
      question: 'Choose the King Colobus!',
      answers: [
        {src:'./pics/emperorTamarin.jpg', name:'Emperor Tamarin'},
        {src:'./pics/mandrill.jpg', name:'Mandrill'},
        {src:'./pics/kingColobus.jpg', name:'King Colobus'},
        {src:'./pics/goldenLionTamarin.jpg', name:'Golden Lion Tamarin'},
      ],
      correctAnswer: 'King Colobus',
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates 

function generateStartHtml() {
  return `
    <div id='start-page'>
      <p>Can you identify the monkey?</p>  
      <button type="button" id="start">Start Quiz</button>
    </div>`;
}

function progressAndScoreHtml() {
  return ` 
  <ul class="question-and-score">
    <li id="question-number">
      Question Number: ${STORE.questionNumber}/${STORE.questions.length-1} 
    </li>
    <li id="score">
      Score: ${STORE.score}/${STORE.questions.length-1}
    </li>
  </ul>
`;
}

function questionHtml() {
  let currentQuestion = STORE.questions[STORE.questionNumber];
  const img = STORE.questions[STORE.questionNumber].image;
  return `
    <section class="section">
        <p>${currentQuestion.question}</p>
    </section>
  `;
}

function answerchoicesHtml() {
  let choiceBtns = '';
  const answersArray = STORE.questions[STORE.questionNumber].answers;
  const buttons = `<button type="button" id="back-btn" tabindex="6">Back</button>`
  let i = 0;
  answersArray.forEach(answer => {
    choiceBtns += `
    <input type="image" name="options" id="${answer.name}" src="${answer.src}"
    tabindex ="${i + 1}" required>
    `;
    i++;
  });
  return `
    <section id="choice-btn-container"> 
      ${choiceBtns}
    </section>` + buttons;
}

function validationHtml(guess) {
  console.log('validating...')
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  console.log(`correct answer is ${correctAnswer}`)
  let html = '';
  if (guess === correctAnswer) {
    STORE.score++;
    html = `
      <div class="right-answer">
        Correct! You've scored ${STORE.score} out of 5.
      </div>
      <button type="button" id="next-btn" tabindex="6">Continue</button>
    `
  } else {
    html = `
      <div class="wrong-answer">
        Wrong! You've scored ${STORE.score} out of 5.
      </div>
       <button type="button" id="next-btn" tabindex="6">Continue</button>
     `
  }
  return html;
}

function finalHtml() {
  return `
    <div class = 'final-page' >
      <p>You're all done!</p>
      <p>You scored ${STORE.score} out of 5.</p>
      <button type="button" id="back-btn" tabindex="6">Back</button>
      <button type="submit" id="restart">Restart Quiz</button>
    </div>
  `;
}

/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = '';

  console.log('rendering...', `now on question ${STORE.questionNumber}`);
  if (STORE.quizStarted === false) {
    $('main').html(generateStartHtml());
    return;
  } 
  else if (STORE.questionNumber < STORE.questions.length) {
    html = questionHtml();
    html += progressAndScoreHtml();
    html += answerchoicesHtml();
    
    $('main').html(html);
  } else {
    $('main').html(finalHtml());
  };
}

/********** EVENT HANDLER FUNCTIONS **********/

function clickStart() {
  $("main").on("click", "#start", event => {
    console.log("started");
    STORE.quizStarted = true;
    STORE.questionNumber ++;
    render();
  });
}

//Click header to navigate to main page & reset data
function clickHeader() {
  $(":header").on('click', event => {
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.score = 0;
    render();
  } )
}

//validates when an image is selected!
function clickValidate() {
    $('main').on("click", "input[name=options]", event => {
      let guess = $(event.target).attr('id')
      console.log(`user chose ${guess}`);
      $('main').html(validationHtml(guess));
    });
}

function clickContinue() {
  $('main').on('click', '#next-btn', event => {
    STORE.questionNumber++;
    render();
  });
}

function clickBack() {
  $('main').on('click', '#back-btn', event => {
    if (STORE.questionNumber===1) {
      STORE.questionNumber--;
      $('main').html(generateStartHtml());
      if (STORE.score >= 1) {
        STORE.score--;
        render();
      }
    }
    else {
      STORE.questionNumber--;
      if (STORE.score >= 1) {
        STORE.score--;
      }
      render(); 
    }
    
  });
}

 function restart() {
  $('main').on("click", '#restart', event => {
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.score = 0;
    render();
    });
   }

function handleQuizApp() {
  render();
  clickStart();
  clickHeader();
  clickBack();
  clickContinue();
  restart();
  clickValidate();
}
$(handleQuizApp);