/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    book: {
      image: '.book__image',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const classNames = {
    favorite: 'favorite',
  };

  const render = function () {
    const booksContainer = document.querySelector(select.containerOf.booksList);

    for (const book of dataSource.books) {
      const generatedHTML = templates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksContainer.appendChild(generatedDOM);
    }
  };

  let favoriteBooks = [];

  const initActions = function () {
    const bookImages = document.querySelectorAll(select.book.image);

    for (const image of bookImages) {
      image.addEventListener('dblclick', function (e) {
        e.preventDefault();

        const imageContainer = e.target.offsetParent;
        const imageContainerId = imageContainer.getAttribute('data-id');

        if (!imageContainer.classList.contains(classNames.favorite)) {
          imageContainer.classList.add(classNames.favorite);
          favoriteBooks.push(imageContainerId);
        } else {
          imageContainer.classList.remove(classNames.favorite);
          favoriteBooks = favoriteBooks.filter(item => item !== imageContainerId);
        }
        // console.log(favoriteBooks);
      });
    }
  };

  render();
  initActions();
}
