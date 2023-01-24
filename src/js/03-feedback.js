import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formEmailEl = document.querySelector('[name="email"]');
const formMessageEl = document.querySelector('[name="message"]');

formEmailEl.required = true;
formMessageEl.required = true;

const LOCALSTORAGE_KEY = "feedback-form-state";
loadPage();
const usersData = { email: formEmailEl.value, message: formMessageEl.value };

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onSubmitClick);

function onFormInput(e) {
    usersData[`${e.target.name}`] = e.target.value;
    save(LOCALSTORAGE_KEY, usersData);
}

function loadPage() {
    const loadDate = load(LOCALSTORAGE_KEY);

    formEmailEl.value = localStorage[LOCALSTORAGE_KEY] ? loadDate.email : '';
    formMessageEl.value = localStorage[LOCALSTORAGE_KEY] ? loadDate.message : '';
}

function onSubmitClick(e) {   
    e.preventDefault();
    console.log(usersData);
    formEl.reset();
    usersData.email = '';
    usersData.message = '';
    remove(LOCALSTORAGE_KEY);
}

function save(key, value) {
    try {
      const usersDataSaved = JSON.stringify(value);
      localStorage.setItem(key, usersDataSaved);
    } catch (error) {
      console.error("Saving data error: ", error.message);
    }
};

function load(key) { 
  try {
    const usersDataSaved = localStorage.getItem(key);
    return usersDataSaved === null ? '' : JSON.parse(usersDataSaved);
  } catch (error) {
    console.error("Get data error: ", error.message);
  }
};

function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Remove data error: ", error.message);
  }
};
