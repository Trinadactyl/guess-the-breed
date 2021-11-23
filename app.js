'use strict';

// ******************
// DOG BREED quiz
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
  breed: [],
};

//*************DOG API FUNCTION****************/
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

function getBreedFromUrl() {
  //divde URL by splashes
  let urlBits = STORE.dogURL.split('/');

  //take the breed name again and divide
  let breedName =  urlBits[4].split('-')
  
  STORE.breed = breedName;
}


/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates 

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

function displayDogImage() {

  getDogImage()
  let dog = STORE.dogURL;
  console.log(dog)

  return `<img src="${dog}" alt="a doggie">`
}

function userInputHtml() {
  return `
    <form id="user-form">
      <input type="text" id="input">
      <input type="submit" id="guess-btn" value="answer">
    </form>
  `
}

function resultHtml() {
  let result = validateInput()
  console.log(result)

  return `
  <div id="result">${result}</div>
  `
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

  //console.log('rendering...', `now on question ${STORE.questionNumber}`);
  //console.log(STORE)
  if (STORE.quizStarted === false) {
    $('main').html(generateStartHtml());
    return;
  } 
  else if (STORE.questionNumber) {
    html = progressAndScoreHtml();
    html += displayDogImage();
    html += userInputHtml()
    
    getBreedFromUrl();

    $('main').html(html);
  } else {
    $('main').html(finalHtml());
  };
}

/********** EVENT HANDLER FUNCTIONS **********/
/*********************************************/

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

//handle submit click
function submitAnswer() {
    $('main').on("submit", "#user-form", event => {
      validateInput()

      //just need this to display!
      resultHtml();
      STORE.questionNumber++;
      render();
    });
}

function validateInput() {
  const answer = STORE.breed;
  const input = $('#input').val()

  // console.log(`you said ${input}`)
  // console.log(`answer is ${answer}`)

  if (answer.includes(input)) {
    STORE.score++;
    return `Correct! You said ${input}, answer is ${answer}`
  } else {
    return `Wrong. You said ${input}, answer is ${answer}`;
  }
}

function handleQuizApp() {
  getDogImage();
  render();
  clickStart();
  clickHeader();
  submitAnswer();
  displayDogImage();
}


$(handleQuizApp);