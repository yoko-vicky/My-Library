// At the beginning
// import { func_name1, func_name2 } from './functions';

const myLibrary = [];

function Book(title, author, year, status = false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.status = status;
}

function addBookToLibrary(book) {
  book = {
    title: book.title,
    author: book.author,
    year: book.year,
    status: book.status,
  };
  myLibrary.push(book);
}

function bookStatus(book) {
  return book.status === true ? 'Read Already' : 'Not yet';
}

const books = document.getElementById('books_body');
function displayBooks(library) {
  books.innerHTML = '';
  library.forEach((book, index) => {
    const tr = document.createElement('tr');
    books.appendChild(tr);

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>${bookStatus(book)}</td>
    `;

    const rmBtn = document.createElement('button');
    rmBtn.setAttribute('type', 'button');
    rmBtn.setAttribute('data-target', index);
    rmBtn.classList.add('remove-btn');
    rmBtn.innerText = 'Remove';
    const td = document.createElement('td');
    tr.appendChild(td);
    td.appendChild(rmBtn);

    const rmBtns = document.querySelectorAll('.remove-btn');
    rmBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        myLibrary.splice(e.target.getAttribute('data-target'), 1);
        displayBooks(myLibrary);
      });
    });
  });
}

const form = document.querySelector('#add_form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const yearInput = document.getElementById('year');
const statusInput = document.getElementById('status');

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.elements.title.value;
  const author = e.target.elements.author.value;
  const year = e.target.elements.year.value;
  const status = e.target.elements.status.checked;

  const newBook = new Book(title, author, year, status);
  addBookToLibrary(newBook);
  displayBooks(myLibrary);

  titleInput.value = '';
  authorInput.value = '';
  yearInput.value = '';
  statusInput.checked = false;
});

const newBookBtn = document.querySelector('#new_book');
newBookBtn.addEventListener('click', () => {
  form.classList.toggle('open');
});
