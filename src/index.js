const listItem = document.querySelector('.books-list');
const form = document.querySelector('.form');

class Books {
  constructor() {
    this.list = localStorage.getItem('booksStore')
      ? JSON.parse(localStorage.getItem('booksStore'))
      : [];
  }

  addBook(book) {
    this.list.push(book);

    localStorage.setItem('booksStore', JSON.stringify(this.list));
  }

  removeBook(title) {
    this.list = this.list.filter((currBook) => currBook.title !== title);

    localStorage.setItem('booksStore', JSON.stringify(this.list));
  }
}

const booksList = new Books();

const renderBooks = () => {
  listItem.innerHTML = '';

  booksList.list.forEach((book) => {
    listItem.innerHTML += `
        <li>
          <p>"<span class="title">${book.title}</span>" by ${book.author}</p>
          <button class="removeBtn">Remove</button>
        </li>
    `;
  });

  const removeBtns = document.querySelectorAll('.removeBtn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const element = btn.parentNode; // <li> </li>
      // console.log('element: ', element);
      const bookTitle = element.querySelector('.title').textContent;

      booksList.removeBook(bookTitle);

      element.remove();
    });
  });
};

renderBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.title.value;
  const author = form.author.value;

  form.title.value = '';
  form.author.value = '';

  booksList.addBook({ title, author });
  renderBooks();
});
