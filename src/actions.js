import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING, 
  REQUEST_ROBOTS_SUCCESS, 
  REQUEST_ROBOTS_FAILED
} from './constants.js'

// by setting CHANGE_SEARCH_FIELD to a variable that is equal to the same string, this
// will prevent errors in typing in the string. IT is a common trick in redux. The
// variable is set in the constants.js folder.
export const setSearchField = (text) => {
  return {
    type: CHANGE_SEARCH_FIELD,
    payload: text
  }
};
//redux action. 

// returns a function which triggers redux-thunk, which gives it dispatch 
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING});
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => dispatch({type: REQUEST_ROBOTS_SUCCESS, payload: data}))
    .catch(error => dispatch({type: REQUEST_ROBOTS_FAILED, payload: error}));
};