{
  ('use strict');

  const booksList = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  console.log(dataSource);

  const render = function () {
    for (const book of dataSource.books) {
      /* generate HTML based on template */
      const generatedHTML = booksTemplate(book);
      /* create element using utils.createElementFromHTML */
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      /* add element to menu */
      booksList.appendChild(generatedDOM);
    }
  };

  const favoriteBooks = [];

  const initActions = function () {
    const bookImages = document.querySelectorAll('.book__image');
    console.log(bookImages);

    for (let i = 0; i < bookImages.length; i++) {
      bookImages[i].addEventListener('dblclick', function (e) {
        e.preventDefault();
        this.classList.add('favorite');
        favoriteBooks.push(this.getAttribute('data-id'));
      });
    }
    console.log(favoriteBooks);
  };

  render();
  initActions();
}
