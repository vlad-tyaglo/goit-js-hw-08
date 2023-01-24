const throttle = require('lodash.throttle');

const feedbackFormEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let userData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function autofillContactForm() {
  try {
    
    for (const key in userData) {
      feedbackFormEl.elements[key].value = userData[key];
    }
  } catch (err) {
    console.log(err);
  }
}

autofillContactForm(); 

function onFeedbackFormInput(e) {
  const { name, value } = e.target;
  userData[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function onFeedbackFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.target;

  if (email.value === '' || message.value === '') {
    alert('All fields must be filled');
  } else {
    console.log(userData);
    feedbackFormEl.reset();
    localStorage.removeItem(STORAGE_KEY);
    userData = {};
  }
}

feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));