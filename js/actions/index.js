var fetch = require('isomorphic-fetch');


var NEW_GAME = 'NEW_GAME';
var newGame = function(secretNumber){
  return {
    type: NEW_GAME,
    secretNumber: secretNumber
  };
};

var MAKE_GUESS = 'MAKE_GUESS';
var makeGuess = function(guess) {
  return {
    type: MAKE_GUESS,
    guess: guess
  };
};

var OPEN_MODAL = 'OPEN_MODAL';
var openModal = function(){
  return {
    type: OPEN_MODAL,
    show: true
  };
};

var CLOSE_MODAL = 'CLOSE_MODAL';
var closeModal = function(){
  return {
    type: CLOSE_MODAL,
    show: false
  };
};


var FETCH_FEWEST_GUESS_SUCCESS = 'FETCH_FEWEST_GUESS_SUCCESS';
var fetchFewestGuessSuccess = function(fewestGuesses){
  return {
    type: FETCH_FEWEST_GUESS_SUCCESS,
    fewestGuesses: fewestGuesses
  };
};

var FETCH_FEWEST_GUESS_ERROR = 'FETCH_FEWEST_GUESS_ERROR';
var fetchFewestGuessError = function(fewestGuesses, error){
  return {
    type: FETCH_FEWEST_GUESS_ERROR,
    fewestGuesses: fewestGuesses,
    error: error
  };
};

var SAVE_GUESS_COUNT_SUCCESS = 'SAVE_GUESS_COUNT_SUCCESS';
var saveGuessCountSuccess = function(guessCount){
    return {
    type: SAVE_GUESS_COUNT_SUCCESS,
    guessCount: guessCount
  };
};

var SAVE_GUESS_COUNT_ERROR = 'SAVE_GUESS_COUNT_ERROR';
var saveGuessCountError = function(guessCount, error){
    return {
    type: SAVE_GUESS_COUNT_SUCCESS,
    guessCount: guessCount,
    error: error
  };
};

var UPDATE_FEWEST_GUESSES = 'UPDATE_FEWEST_GUESSES';
var updateFewestGuesses = function(userGuess){
    return {
    type: UPDATE_FEWEST_GUESSES,
    userGuess
  };
};

var fetchFewestGuesses = function(fewestGuesses){

  return function(dispatch){
    var url = 'https://react-redux-angiecrellin.c9users.io';
    return fetch(url).then(function(response){
      if (response.state < 200 || response.status >= 300){
        var error = new Error(response.statusText)
        error.response = response
        throw error;
      }
      return response;
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      var fewestGuesses = data.fewestGuesses;
      return dispatch(fetchFewestGuessSuccess(fewestGuesses));
      })
    .catch(function(error){
      return dispatch(fetchFewestGuessError(fewestGuesses, error));
    });
  }
}

var saveGuessCount = function(data, guessCount){
  var fewestGuesses = data.fewestGuesses;
  return function(dispatch){
    var url = 'https://react-redux-angiecrellin.c9users.io';
    dispatch(saveGuessCountSuccess(guessCount));
      fetch(url, {
      body: JSON.stringify({
        guessCount
      })
    })
    .then(function(data){
    })
    .catch(function(error){
      return dispatch(saveGuessCountError(fewestGuesses, error));
    });
  }
};




exports.NEW_GAME = NEW_GAME;
exports.newGame = newGame;
exports.MAKE_GUESS = MAKE_GUESS;
exports.makeGuess = makeGuess;


exports.OPEN_MODAL = OPEN_MODAL;
exports.openModal = openModal;
exports.CLOSE_MODAL = CLOSE_MODAL;
exports.closeModal = closeModal;


exports.FETCH_FEWEST_GUESS_SUCCESS = FETCH_FEWEST_GUESS_SUCCESS;
exports.fetchFewestGuessSuccess = fetchFewestGuessSuccess;
exports.FETCH_FEWEST_GUESS_ERROR = FETCH_FEWEST_GUESS_ERROR;
exports.fetchFewestGuessError = fetchFewestGuessError;
exports.SAVE_GUESS_COUNT_SUCCESS = SAVE_GUESS_COUNT_SUCCESS;
exports.saveGuessCountSuccess = saveGuessCountSuccess;
exports.SAVE_GUESS_COUNT_ERROR = SAVE_GUESS_COUNT_ERROR;
exports.saveGuessCountError = saveGuessCountError;

exports.fetchFewestGuesses = fetchFewestGuesses;
exports.saveGuessCount = saveGuessCount;
exports.updateFewestGuesses = updateFewestGuesses;
