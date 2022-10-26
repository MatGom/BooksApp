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
  class BookList {
    constructor() {
      const thisBookList = this;

      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];

      thisBookList.initData();
      thisBookList.render();
      thisBookList.getElements();
      thisBookList.initActions();
    }

    initData() {
      const thisBookList = this;

      thisBookList.data = dataSource.books;
    }

    getElements() {
      const thisBookList = this;

      thisBookList.bookImages = document.querySelectorAll(select.book.image);
      thisBookList.bookFilter = document.querySelector(select.containerOf.filters);
    }

    render() {
      const thisBookList = this;

      for (const book of thisBookList.data) {
        const ratingBgc = thisBookList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;

        book.ratingBgc = ratingBgc;
        book.ratingWidth = ratingWidth;

        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.containerOf.booksList);
        booksContainer.appendChild(generatedDOM);
      }
    }

    initActions() {
      const thisBookList = this;

      for (const image of thisBookList.bookImages) {
        image.addEventListener('dblclick', function (e) {
          e.preventDefault();

          const imageContainer = e.target.offsetParent;
          const imageContainerId = imageContainer.getAttribute('data-id');

          if (!imageContainer.classList.contains(classNames.favorite)) {
            imageContainer.classList.add(classNames.favorite);
            thisBookList.favoriteBooks.push(imageContainerId);
          } else {
            imageContainer.classList.remove(classNames.favorite);
            thisBookList.favoriteBooks = thisBookList.favoriteBooks.filter(item => item !== imageContainerId);
          }
        });
      }

      thisBookList.bookFilter.addEventListener('click', function (e) {
        const filter = e.target;

        if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
          if (filter.checked == true) {
            thisBookList.filters.push(filter.value);
          } else if (filter.checked == false) {
            thisBookList.filters.splice(thisBookList.filters.indexOf(filter.value), 1);
          }
        }
        thisBookList.filterBooks();
      });
    }

    filterBooks() {
      const thisBookList = this;

      for (const book of dataSource.books) {
        let shouldBeHidden = false;

        for (const filter of thisBookList.filters) {
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
    }

    determineRatingBgc(rating) {
      let ratingBgc = '';

      if (rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }

      return ratingBgc;
    }
  }

  // eslint-disable-next-line no-unused-vars
  const app = new BookList();
}
