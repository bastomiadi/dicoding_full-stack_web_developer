// Do your work here...

const STORAGE_KEY = 'BOOKSHELF_APPS';

let books = [];

// ================= LOCAL STORAGE =================
function isStorageExist() {
  return typeof Storage !== 'undefined';
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    books = JSON.parse(data);
  }
}

// ================= RENDER =================
function renderBooks() {
  const incompleteList = document.getElementById('incompleteBookList');
  const completeList = document.getElementById('completeBookList');

  incompleteList.innerHTML = '';
  completeList.innerHTML = '';

  for (const book of books) {
    const bookEl = createBookElement(book);

    if (book.isComplete) {
      completeList.appendChild(bookEl);
    } else {
      incompleteList.appendChild(bookEl);
    }
  }
}

// ================= CREATE ELEMENT =================
function createBookElement(book) {
  const container = document.createElement('div');
  container.setAttribute('data-bookid', book.id);
  container.setAttribute('data-testid', 'bookItem');

  const title = document.createElement('h3');
  title.setAttribute('data-testid', 'bookItemTitle');
  title.innerText = book.title;

  const author = document.createElement('p');
  author.setAttribute('data-testid', 'bookItemAuthor');
  author.innerText = `Penulis: ${book.author}`;

  const year = document.createElement('p');
  year.setAttribute('data-testid', 'bookItemYear');
  year.innerText = `Tahun: ${book.year}`;

  const buttonContainer = document.createElement('div');

  const toggleBtn = document.createElement('button');
  toggleBtn.setAttribute('data-testid', 'bookItemIsCompleteButton');
  toggleBtn.innerText = book.isComplete
    ? 'Belum selesai dibaca'
    : 'Selesai dibaca';

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('data-testid', 'bookItemDeleteButton');
  deleteBtn.innerText = 'Hapus Buku';

  const editBtn = document.createElement('button');
  editBtn.setAttribute('data-testid', 'bookItemEditButton');
  editBtn.innerText = 'Edit Buku';

  // ================= EVENT =================

  // pindah rak
  toggleBtn.addEventListener('click', function () {
    book.isComplete = !book.isComplete;
    saveData();
    renderBooks();
  });

  // hapus
  deleteBtn.addEventListener('click', function () {
    books = books.filter((b) => b.id !== book.id);
    saveData();
    renderBooks();
  });

  // edit (opsional tapi bagus)
  editBtn.addEventListener('click', function () {
    const newTitle = prompt('Judul baru', book.title);
    const newAuthor = prompt('Penulis baru', book.author);
    const newYear = prompt('Tahun baru', book.year);

    if (newTitle) book.title = newTitle;
    if (newAuthor) book.author = newAuthor;
    if (newYear) book.year = Number(newYear);

    saveData();
    renderBooks();
  });

  buttonContainer.append(toggleBtn, deleteBtn, editBtn);
  container.append(title, author, year, buttonContainer);

  return container;
}

// ================= ADD BOOK =================
document.getElementById('bookForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const title = document.getElementById('bookFormTitle').value;
  const author = document.getElementById('bookFormAuthor').value;
  const year = Number(document.getElementById('bookFormYear').value);
  const isComplete = document.getElementById('bookFormIsComplete').checked;

  const newBook = {
    id: new Date().getTime(),
    title,
    author,
    year,
    isComplete,
  };

  books.push(newBook);
  saveData();
  renderBooks();

  this.reset();
});

// ================= INIT =================
document.addEventListener('DOMContentLoaded', function () {
  if (!isStorageExist()) {
    alert('Browser tidak mendukung localStorage');
    return;
  }

  loadData();
  renderBooks();
});


//console.log('Hello, world!');
