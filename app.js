'use strict';


const STORE = {
  questions: [
    {
      question: 'What kind of monkey is this?',
      answers: [
        'Baboon',
        'Mandrill',
        'Clown Monkey',
        'Red-shanked Douc'
      ],
      correctAnswer: 'Mandrill',
      image: './pics/mandrill.jpg'
    },
    {
      question: 'What kind of monkey is this?',
      answers: [
        'Emperor Tamarin',
        'Bearded Macaque',
        'Marmoset',
        'Squirrel Monkey',
      ],
      correctAnswer: 'Emperor Tamarin',
      image: './pics/squirrelMonkey.jpg'
    },
    {
      question: 'What kind of monkey is this?',
      answers: [
        'Pygmy Marmoset',
        'Big-nose Baboon',
        'Grivet',
        'Probiscis Monkey',
      ],
      correctAnswer: 'Proboscis monkey',
      image: './pics/proboscisMonkey.jpg'
    },
    {
      question: 'What kind of monkey is this?',
      answers: [
        'Cotton-top Tamarin',
        'Celebes crested Macaque',
        'Hamadryas Baboon',
        'Mantled Guereza'
      ],
      correctAnswer: 'Hamadryas Baboon',
      image: './pics/hamadryasbaboon.jpg'
    },
    {
      question: 'What kind of monkey is this?',
      answers: [
        'Silvery Lutung',
        'Gorilla',
        'Japanese Macaque',
        'Sooty Mangabey'
      ],
      correctAnswer: 'Japanese Macaque',
      image: './pics/japaneseMacaque.jpg'
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
    <div class='start-page'>
      <p>Can you identify the monkey?</p>  
      <button type="button" id="start">Start Quiz</button>
    </div>`;
}

function progressAndScoreHtml() {
  return ` 
  <ul class="question-and-score">
    <li id="question-number">
      Question Number: ${STORE.questionNumber}/${STORE.questions.length}
    </li>
    <li id="score">
      Score: ${STORE.score}/${STORE.questions.length}
    </li>
  </ul>
`;
}

function questionHtml() {
  let currentQuestion = STORE.questions[STORE.questionNumber];
  const img = STORE.questions[STORE.questionNumber].image;
  console.log('where is it', STORE.questions[STORE.questionNumber])
  return `
    <section class="section">
        <p>${currentQuestion.question}</p>
        <img src='${img}'>
    </section>
  `;
}

function answerchoicesHtml() {
  let answersHtml = '';
  const answersArray = STORE.questions[STORE.questionNumber].answers;
  const buttons = `<div id="back-next">
                      <button type="button" id="back-btn" tabindex="6">Back</button>
                      <button type="button" id="next-btn" tabindex="6">Next Question</button>                    
                    </div>`
  let i = 0;
  console.log(answersArray)
  answersArray.forEach(answer => {
    answersHtml += `
    <div id="option-container-${i}">
    <input type="radio" name="options" id="option${i + 1}" value= "${answer}"
    tabindex ="${i + 1}" required>
    <label for="option${i + 1}"> ${answer}</label>
    </div>
    `;
    i++;
  });
  return answersHtml + buttons;
}

function feedbackHtml(answerStat) {
  let correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
  let html = '';
  if (answerStat === correctAnswer) {
    html = `
      <div class="right-answer">Correct!</div>
      <button type="button" id="next-question-btn" tabindex="6">Next Question</button>
    `
  } else {
    html = `
       <div class="wrong-answer">Wrong!</div>
       <button type="button" id="next-question-btn" tabindex="6">Next Question</button>
     `
  }
}

function finalHtml() {
  return `
    <div class = 'final-page' >
      <p>You're all done!</p>
      <p>You scored ${STORE.score} of 5.</p>
      <button type="button" id="back-btn" tabindex="6">Back</button>
      <button type="submit" id="restart">Restart Quiz</button>
    </div>
  `;
}



/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store


function render() {
  let html = '';
  console.log('rendering', STORE.quizStarted, STORE.questionNumber);
  if (STORE.quizStarted === false) {
    $('main').html(generateStartHtml());
    return;
  } else if (STORE.questionNumber < STORE.questions.length) {
    html = questionHtml();
    html += answerchoicesHtml();
    html += progressAndScoreHtml();
    $('main').html(html);
  } else {
    $('main').html(finalHtml());
  };
}

function questionNumber(question) {
  //question number value increments to show progress
}

function score() {
  //score value increments when questons are answered correctly
}

/********** EVENT HANDLER FUNCTIONS **********/

//start the quiz!!
function clickStart() {
  $("main").on("click", "#start", function(event) {
    console.log("started");
    STORE.quizStarted = true;
    STORE.questionNumber ++;
    render();
  });
}

function clickNext() {
  $('main').on('click', '#next-btn', event => {
    STORE.questionNumber < STORE.questions.length
    STORE.questionNumber++;
    render();
  });
}

function clickBack() {
  $('main').on('click', '#back-btn', event => {
    console.log('back-btn clicked')
    if (STORE.questionNumber===1) {
      $('main').html(generateStartHtml())
    }
    else {
      STORE.questionNumber < STORE.questions.length
      STORE.questionNumber--;
      render(); 
    }
    
  });
}

function chooseAnswer() {
  $('main').on("sumbit", '#option', event => {
    event.preventDefault();
    console.log('Submitted');
  });
}

 function restart() {
  console.log('restart click')
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
  clickBack();
  clickNext();
  restart();
  chooseAnswer();
}
$(handleQuizApp);