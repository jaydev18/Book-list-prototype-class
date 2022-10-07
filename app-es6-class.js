class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //create tr element
    const row = document.createElement("tr");
    //insert cols
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    //appenchild
    list.appendChild(row);
  }
  showAlert(message, className) {
    const div = document.createElement("div");
    //add class
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //insert to dom
    //Get parent
    const container = document.querySelector(".container");
    //get form
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//Event Listner for add
document.getElementById("book-form").addEventListener("submit", function (e) {
  //get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  //create/instantiate book object

  const book = new Book(title, author, isbn);

  //Instantiate UI object
  const ui = new UI();
  //validate
  if (title === "" || author === "" || isbn === "") {
    //Error
    ui.showAlert("Plase fill in all Field", "error");
  } else {
    //Add book to list
    ui.addBookToList(book);
    // show success
    ui.showAlert("Book Added!", "success");
    //to clear the field
    ui.clearFields();
  }

  // console.log(ui);
  e.preventDefault();
});

//event listner for delete

document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target);
  //show message
  ui.showAlert("Book Removed!", "success");
  e.preventDefault();
});
