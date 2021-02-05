//  FUNCTIONS =======================================
function Book(title, author, year, status = false) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.status = status;
}
function getSavedLibrary() {
  const libraryJSON = localStorage.getItem('library');

  try {
    return libraryJSON ? JSON.parse(libraryJSON) : [];
  } catch (error) {
    return [];
  }
}
function addBookToLocalStorage(library) {
  localStorage.setItem('library', JSON.stringify(library));
}

function removeBook(library, index) {
  library.splice(index, 1);
}
function changeStatus(index, library) {
  library[index].status = !library[index].status;
}
function bookStatus(book) {
  return book.status === true ? 'Read Already' : 'Not yet';
}
function displayBooks(library) {
  const books = document.getElementById('books_body');
  books.innerHTML = '';
  library.forEach((book, index) => {
    const tr = document.createElement('tr');
    books.appendChild(tr);

    tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><span class="display_status">${bookStatus(book)}</span><br><button type="button" data-target="${index}" class="swicth-btn">Change status</button></td>
      <td><button type="button" data-target="${index}" class="remove-btn">remove</button></td>
    `;
  });

  // WHEN EACH REMOVE BUTTON IS CLICKED
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      removeBook(library, e.target.getAttribute('data-target'));
      addBookToLocalStorage(library);
      displayBooks(library);
    });
  });

  // WHEN EACH SWICTH BUTTON IS CLICKED
  document.querySelectorAll('.swicth-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      changeStatus(e.target.getAttribute('data-target'), library);
      addBookToLocalStorage(library);
      displayBooks(library);
    });
  });
}

//  RUNNING =======================================

// ARRAY FOR LIBRARY
const myLibrary = getSavedLibrary();

// RUN
displayBooks(myLibrary);

// TOGGLE BUTTON FOR FORM
document.querySelector('#new_book').addEventListener('click', () => {
  document.querySelector('#add_form').classList.toggle('open');
});

// FORM SUBMISSION
document.querySelector('#add_form').addEventListener('submit', e => {
  e.preventDefault();
  const title = e.target.elements.title.value;
  const author = e.target.elements.author.value;
  const year = e.target.elements.year.value;
  const status = e.target.elements.status.checked;

  const newBook = new Book(title, author, year, status);
  myLibrary.push(newBook);
  addBookToLocalStorage(myLibrary);
  displayBooks(myLibrary);

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('year').value = '';
  document.getElementById('status').checked = false;
});
