class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
  }
}

class UI {

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book))
  }

  static addBookToList(book) {

    const bookContent = document.querySelector('.bookContent')

    const html = `
         <tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="remove"><i class="fa-solid fa-xmark delete"></i></a></td>
          </tr> `

    bookContent.insertAdjacentHTML('beforeend', html)
  }

  static deleteBook(el) {


    if (!(el.classList.contains('delete'))) return

    el.parentElement.parentElement.parentElement.remove();


    UI.showMessage(document.querySelector('.deleteBookMessage'), document.querySelector('.addedBookMessage'), document.querySelector('.fillFieldsMessage'))
  }

  static clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }

  static showMessage(message, messageRemove1, messageRemove2) {

    messageRemove1.classList.remove('active')
    messageRemove2.classList.remove('active')
    message.classList.add('active')

    setTimeout(() => message.classList.remove('active'), 3000)
  }

}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()

    books.forEach((book, index) => {
      if (book.isbn == isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }

  static deleteAllBook() {
    localStorage.clear()
    document.querySelector('.bookContent').textContent = ''
  }
}


document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('.btnAdd').addEventListener('click', (e) => {
  e.preventDefault()


  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  if (!title || !author || !isbn) {
    UI.showMessage(document.querySelector('.fillFieldsMessage'), document.querySelector('.addedBookMessage'), document.querySelector('.deleteBookMessage'))
    return
  } else {
    UI.showMessage(document.querySelector('.addedBookMessage'), document.querySelector('.fillFieldsMessage'), document.querySelector('.deleteBookMessage'))
  }

  const book = new Book(title, author, isbn)

  UI.addBookToList(book)

  Store.addBook(book)

  UI.clearFields()

})

document.querySelector('.bookContent').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent)
})


document.querySelector('.btnRemove').addEventListener('click', () => {
  Store.deleteAllBook();

  // document.location.reload()
})