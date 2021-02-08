const LibraryModule = (() => {
  class Book {
    constructor(title, author, year, status = false) {
      this.title = title;
      this.author = author;
      this.year = year;
      this.status = status;
    }

    addBookToLibrary(library) {
      library.push(this);
    }

    setValueToNewBook = (el) => {
      this.title = el.title.value;
      this.author = el.author.value;
      this.year = el.year.value;
      this.status = el.status.checked;
    };
  }
  function getSavedLibrary() {
    const libraryJSON = localStorage.getItem('library');

    try {
      return libraryJSON ? JSON.parse(libraryJSON) : [];
    } catch (error) {
      return [];
    }
  }
  function addLibraryToLocalStorage(library) {
    localStorage.setItem('library', JSON.stringify(library));
  }
  function removeBook(library, index) {
    library.splice(index, 1);
  }
  function changeStatus(index, library) {
    library[index].status = !library[index].status;
  }
  function displayBooks(library) {
    const books = document.getElementById('books_body');
    books.innerHTML = '';
    library.forEach((book, index) => {
      const tr = document.createElement('tr');
      tr.classList.add('book__tr');
      books.appendChild(tr);

      tr.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
    `;

      // CREATE BOOK STATUS AND SWITCH BUTTON
      const td = document.createElement('td');
      td.classList.add('books__td');
      const span = document.createElement('span');
      span.classList.add('display_status');
      span.textContent = book.status === true ? 'Read Already' : 'Not yet';
      const button = document.createElement('button');
      button.setAttribute('data-target', index);
      button.classList.add('swicth-btn', 'btn', 'btn__sm');
      button.textContent = 'Change status';
      tr.appendChild(td);
      td.appendChild(span);
      td.appendChild(button);

      // WHEN EACH SWICTH BUTTON IS CLICKED
      button.addEventListener('click', e => {
        changeStatus(e.target.getAttribute('data-target'), library);
        addLibraryToLocalStorage(library);
        displayBooks(library);
      });

      // CREATE REMOVE BUTTON
      const rmTd = document.createElement('td');
      rmTd.classList.add('books__td');
      const rmBtn = document.createElement('button');
      rmBtn.setAttribute('data-target', index);
      rmBtn.classList.add('remove-btn', 'btn', 'btn__sm');
      rmBtn.textContent = 'remove';
      tr.appendChild(rmTd);
      rmTd.appendChild(rmBtn);

      // WHEN EACH REMOVE BUTTON IS CLICKED
      rmBtn.addEventListener('click', e => {
        removeBook(library, e.target.getAttribute('data-target'));
        addLibraryToLocalStorage(library);
        displayBooks(library);
      });
    });
  }

  const clearValueFromField = () => {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('year').value = '';
    document.getElementById('status').checked = false;
  };
  function toggleOpenClassToNewButton() {
    document.querySelector('#add_form').classList.toggle('open');
  }

  return {
    Book,
    getSavedLibrary,
    displayBooks,
    clearValueFromField,
    toggleOpenClassToNewButton,
    addLibraryToLocalStorage,
  };
})();

//  RUNNING =======================================

// ARRAY FOR LIBRARY
const myLibrary = LibraryModule.getSavedLibrary();

// RUN
LibraryModule.displayBooks(myLibrary);

// TOGGLE BUTTON FOR FORM
document.querySelector('#new_book').addEventListener('click', () => {
  LibraryModule.toggleOpenClassToNewButton();
});

// FORM SUBMISSION
document.querySelector('#add_form').addEventListener('submit', e => {
  e.preventDefault();
  const newBook = new LibraryModule.Book();
  newBook.setValueToNewBook(e.target.elements);
  newBook.addBookToLibrary(myLibrary);
  LibraryModule.addLibraryToLocalStorage(myLibrary);
  LibraryModule.displayBooks(myLibrary);
  LibraryModule.clearValueFromField();
});
