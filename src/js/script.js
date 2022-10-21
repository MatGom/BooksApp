/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

  const booksList = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  const render = function () {
    for (const book of dataSource.books) {
      const generatedHTML = booksTemplate(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksList.appendChild(generatedDOM);
    }
  };

  let favoriteBooks = [];

  const initActions = function () {
    const bookImages = document.querySelectorAll('.book__image');

    for (let i = 0; i < bookImages.length; i++) {
      bookImages[i].addEventListener('dblclick', function (e) {
        e.preventDefault();
        if (!bookImages[i].classList.contains('favorite')) {
          this.classList.add('favorite');
          favoriteBooks.push(this.getAttribute('data-id'));
        } else {
          this.classList.remove('favorite');
          favoriteBooks = favoriteBooks.filter(item => item !== this.getAttribute('data-id'));
        }
      });
    }
  };

  render();
  initActions();
}
