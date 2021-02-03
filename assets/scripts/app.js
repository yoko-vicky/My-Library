// At the beginning
import {
  Book, addBookToLibrary, displayBooks,
} from './functions';

// ARRAY FOR LIBRARY
const myLibrary = [];

// RUN
displayBooks(myLibrary);

// GET ELEMENTS FROM HTML
const form = document.querySelector('#add_form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const statusInput = document.getElementById('status');
const newBookBtn = document.querySelector('#new_book');

// TOGGLE BUTTON FOR FORM
newBookBtn.addEventListener('click', () => {
  form.classList.toggle('open');
});

// FORM SUBMISSION
form.addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.elements.title.value;
  const author = e.target.elements.author.value;
  const year = e.target.elements.year.value;
  const status = e.target.elements.status.checked;

  const newBook = new Book(title, author, year, status);
  addBookToLibrary(newBook, myLibrary);
  displayBooks(myLibrary);

  titleInput.value = '';
  authorInput.value = '';
  yearInput.value = '';
  statusInput.checked = false;
});
