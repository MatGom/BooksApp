/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  ('use strict');

  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      filters: '.filters',
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
    hidden: 'hidden',
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
  const filters = [];

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

    const bookFilter = document.querySelector(select.containerOf.filters);

    bookFilter.addEventListener('click', function (e) {
      const filter = e.target;
      if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
        if (filter.checked == true) {
          filters.push(filter.value);
        } else if (filter.checked == false) {
          filters.splice(filters.indexOf(filter.value), 1);
        }
      }
      filterBooks();
    });
  };

  const filterBooks = function () {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;

      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }

      const hideBook = document.querySelector(`.book__image[data-id="${book.id}"]`);

      if (shouldBeHidden == true) {
        hideBook.classList.add(classNames.hidden);
      } else {
        hideBook.classList.remove(classNames.hidden);
      }
    }
  };

  render();
  initActions();
}
