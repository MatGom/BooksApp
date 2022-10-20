{
  ('use strict');

  const booksList = document.querySelector('.books-list');
  const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  console.log(booksTemplate);

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

  render();
}
