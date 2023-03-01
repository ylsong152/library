const addBook = document.getElementById('add-book');
const popupForm = document.getElementById('popup-form');
const bookDisplay = document.getElementById('book-display');
const submitBtn = document.getElementById('submit-btn');
const returnBtn = document.getElementById('return-btn');
const bookCollection = document.querySelector('.book-collection');
const errorMsg = document.querySelector('#error-msg');
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  if (this.read === 'Yes') {
    this.read = 'No';
  } else if (this.read === 'No') {
    this.read = 'Yes';
  }
};

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function openForm() {
  popupForm.style.display = 'flex';
  bookDisplay.style.display = 'none';
}

function closeForm() {
  errorMsg.innerHTML = '';
  popupForm.style.display = 'none';
  bookDisplay.style.display = 'block';
}

function render() {
  let temp = '';
  for (let i = 0; i < myLibrary.length; i++) {
    temp += `
    <tr>
      <td>${myLibrary[i].title}</td>
      <td>${myLibrary[i].author}</td>
      <td>${myLibrary[i].pages}</td>
      <td>${myLibrary[i].read}</td>
      <td><button id="read-btn" onclick="toggleRead(${i})">Change read status</button</td>
      <td><button id="delete-btn" onclick="deleteBook(${i})">Delete</button</td>
    </tr>
    `;
    bookCollection.innerHTML = temp;
  }
  if (myLibrary.length === 0) {
    bookCollection.innerHTML = '';
  }
  console.log(myLibrary[0].read);
}

function addBookToLibrary() {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const pages = document.getElementById('pages').value;
  const read = document.querySelector('input[name="read"]:checked').value;
  const newBook = new Book(title, author, pages, read);

  if (title.length === 0 || author.length === 0 || pages.length === 0) {
    errorMsg.innerHTML = 'Please fill in the <b>*required fields</b>';
  } else {
    myLibrary.push(newBook);
    render();
    popupForm.reset();
    closeForm();
    console.log(myLibrary);
  }
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  render();
  console.log(myLibrary);
}

addBook.addEventListener('click', openForm);
submitBtn.addEventListener('click', addBookToLibrary);
returnBtn.addEventListener('click', closeForm);
