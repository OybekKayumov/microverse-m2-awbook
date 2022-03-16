const listItem = document.querySelector('.books-list');
const form = document.querySelector('.form');
const msg = document.querySelector('#message');
class Books {
  constructor() {
    this.list = localStorage.getItem('booksStore')
      ? JSON.parse(localStorage.getItem('booksStore'))
      : [];
  }

  addBook(book) {
    this.list.push(book);
    msg.innerHTML = `Book ${book.title} added successfully`;

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

window.addEventListener('DOMContentLoaded', () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = form.title.value;
    const author = form.author.value;

    form.title.value = '';
    form.author.value = '';
    msg.textContent = '';

    booksList.addBook({ title, author });
    renderBooks();
  });
});
