'use strict';

// ******************
// DOG BREED quiz
//   -use dog api to pull rando mimages of different breeds
//   -user types in breed 
//   -user gets a point for correct guess
//   -create a database to witch user can save scores to 
//   -option to see a leaderboard of skills! 
 


//-------------Changes to make:------------------
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
  quizStarted: false, 
  questionNumber: 0,
  score: 0,
  dogURL: "",
};

//*************DOG API FUNCTIONS****************/
function getDogImage(){
  fetch('https://dog.ceo/api/breeds/image/random') 
  .then(response => response.json())
  .then(responseJson => 
    // displayDogImage(responseJson.message)
    STORE.dogURL = responseJson.message
  )
  .catch(error => alert('Oops. Something went wrong')
  );
}


/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates 

function displayDogImage() {
  getDogImage()
  let dog = STORE.dogURL;
  console.log(dog)

  return `<img src="${dog}" alt="a doggie">`
}

function generateStartHtml() {
  return `
    <div id='start-page'>
      <p>Do you know your dog breeds?</p>  
      <button type="button" id="start">Start Quiz</button>
    </div>`;
}

function progressAndScoreHtml() {
  return ` 
  <ul class="question-and-score">
    <li id="question-number">
      Question Number: ${STORE.questionNumber} 
    </li>
    <li id="score">
      Score: ${STORE.score}
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
  else if (STORE.questionNumber) {
    html = progressAndScoreHtml();
    html += displayDogImage();
    
    $('main').html(html);
  } else {
    $('main').html(finalHtml());
  };
}

/********** EVENT HANDLER FUNCTIONS **********/

function clickStart() {
  $("main").on("click", "#start", event => {
    console.log("start clicked");
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
  getDogImage();
  displayDogImage()
}
$(handleQuizApp);