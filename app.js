'use strict';

const STORE = {
  questions: [
    null,
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
        'Bald Ukari',
      ],
      correctAnswer: 'Bald Ukari',
      image: './pics/baldUkari.jpg'
    },
    {
      question: 'What kind of monkey is this?',
      answers: [
        'Pygmy Marmoset',
        'Big-nose Baboon',
        'Grivet',
        'Proboscis Monkey',
      ],
      correctAnswer: 'Proboscis Monkey',
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
        <img src='${img}'>
    </section>
  `;
}

function answerchoicesHtml() {
  let answersHtml = '';
  const answersArray = STORE.questions[STORE.questionNumber].answers;
  const buttons = `<div id="back-next">
                      <button type="button" id="back-btn" tabindex="6">Back</button>
                      <button type="button" id="validate-btn" tabindex="6">Validate!</button>                    
                   </div>`
  let i = 0;
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

/********** EVENT HANDLER FUNCTIONS **********/

function clickStart() {
  $("main").on("click", "#start", event => {
    console.log("started");
    STORE.quizStarted = true;
    STORE.questionNumber ++;
    render();
  });
}

function clickValidate() {
  $('main').on("click", "#validate-btn", event => {
    let guess = $('input[name="options"]:checked').val();
    console.log('Submitted');
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
      $('main').html(generateStartHtml())
    }
    else {
      STORE.questionNumber--;
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
  clickBack();
  clickContinue();
  restart();
  clickValidate();
}
$(handleQuizApp);