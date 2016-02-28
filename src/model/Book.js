function Book(slots) {
   this.isbn = slots.isbn;
   this.title = slots.title;
   this.year = slots.year;
}
Book.instances = {};
// function to add data to Books
Book.add = function(slots) {
   var book = new Book(slots);
   // add book to the Book.instances collectio
   Book.instances[slots.isbn] = book;
   console.log("Book " + slots.isbn + " created!");
};
// convert each row into a coresponding object of type Book
Book.convertRow2Obj = function(bookRow) {
   var book = new Book(bookRow);
   return book;
};
Book.loadAll = function() {
   var key = "",
      keys = [],
      booksString = "",
      books = {};
   try {
      if (localStorage["books"]) {
         // retrieve book table from local storage
         booksString = localStorage['books'];
      }
   } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
   }
   if (booksString) {
      // convert the book string into a coresponding table entity
      books = JSON.parse(booksString);
      keys = Object.keys(books);
      console.log(keys.length + 'books loaded.');
      for (var i = 0; i < keys.length; i++) {
         key = keys[i];
         Book.instances[key] = Book.convertRow2Obj(books[key]);
      }
   }
};
// updating a Book instance
Book.update = function(slots) {
   // retrieve data from .instances
   var book = Book.instances[slots.isbn];
   // year input string is converted to numerical value
   var year = parseInt(slots.year);
   // re-assign the value that changed
   if (book.title !== slots.title) {
      book.title = slots.title;
   }
   if (book.year !== year) {
      book.year = year;
   }
   console.log("Book" + slots.isbn + " modified!");
};
// deleting book instance
Book.destroy = function(isbn) {
   // test if table has row with the given key
   if (Book.instances[isbn]) {
      console.log("Book " + isbn + " deleted!");
      //delete book if found
      delete Book.instances[isbn];
   } else {
      console.log("There is no book with ISBN " + isbn + " in the database!");
   }
};
// saving all Book instances from working memory to local storage
Book.saveAll = function() {
   var booksString = '',
      error = false,
      nmrOfBooks = Object.keys(Book.instances).length;
   try {
      // convert table .instances to string format(serialization)
      booksString = JSON.stringify(Book.instances);
      // asign the value to key 'books' in local storage
      localStorage['books'] = booksString;
   } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
      error = true;
   }
   if (!error) console.log(nmrOfBooks + ' books saved.');
};
// creating test data
Book.createTestData = function() {
   Book.instances["006251587X"] = new Book({
      isbn: "006251587X",
      title: "Weaving the Web",
      year: 2000
   });
   Book.instances["0465026567"] = new Book({
      isbn: "0465026567",
      title: "Gödel, Escher, Bach",
      year: 1999
   });
   Book.instances["0465030793"] = new Book({
      isbn: "0465030793",
      title: "I Am A Strange Loop",
      year: 2008
   });
   Book.saveAll();
};
// clearing all data from local storage
Book.clearData = function() {
   if (confirm('Do you really want to delete all book data?')) {
      localStorage["books"] = '{}';
   }
};
