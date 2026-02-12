// Problem Statement: Library Book Management System
// -------------------------------------------------
// Objective : Create a Book class and use it to manage a collection of books in a library.

// Requirements:
//   Create a Book class with the following:

//   Properties:
//       title (string)
//       author (string)
//       pages (number)
//       isAvailable (boolean, default: true)


//   Methods:
//       borrow() - Marks the book as not available
//       returnBook() - Marks the book as available
//       getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
//       isLongBook() - Returns true if pages > 300, false otherwise




//   1. Create at least 5 book objects using the class:
//       Example: "Harry Potter", "1984", "The Hobbit", etc.


//   2. Perform the following operations:

//       i. Display info of all books
//       ii. Borrow 2 books and show their availability status
//       iii. Return 1 book and show updated status
//       iv. Count how many books are "long books" (more than 300 pages)
//       v. List all available books


class Book
{
   title;
   author;
   pages;
   isavailable;
}

borrow()
{
   this.isavailable = false;
}

returnBook()
{
   this.isavailable = true;
}

getInfo()
{
   return `${this.title} by ${this.author} (${this.pages} pages)`;
}

isLongBook()
{
   return this.pages > 300;
}

// Creating book objects
let book1 = new Book();
book1.title = "Harry Potter";
book1.author = "J.K. Rowling";
book1.pages = 350;
book1.isavailable = true;

let book2 = new Book();
book2.title = "1984";
book2.author = "George Orwell";
book2.pages = 280;
book2.isavailable = true;

let book3 = new Book();
book3.title = "The Hobbit";
book3.author = "J.R.R. Tolkien";
book3.pages = 310;
book3.isavailable = true;

let book4 = new Book();
book4.title = "To Kill a Mockingbird";
book4.author = "Harper Lee";
book4.pages = 281;
book4.isavailable = true;

let book5 = new Book();
book5.title = "The Great Gatsby";
book5.author = "F. Scott Fitzgerald";
book5.pages = 180;
book5.isavailable = true;

// Collection of books
let library = [book1, book2, book3, book4, book5];

// i. Display info of all books
console.log("Book Info:");
library.forEach(book => {
   console.log(getInfo(book));
});

// ii. Borrow 2 books and show their availability status
book1.borrow;
book2.borrow;
console.log(`\nAfter borrowing:`);
console.log(`${book1.title} is available: ${book1.isavailable}`);
console.log(`${book3.title} is available: ${book3.isavailable}`);

// iii. Return 1 book and show updated status
book1.returnBook;
console.log(`\nAfter returning:`);
console.log(`${book1.title} is available: ${book1.isavailable}`);

// iv. Count how many books are "long books" (more than 300 pages)
let longBookCount = library.filter(book => isLongBook(book)).length;
console.log(`\nNumber of long books (>300 pages): ${longBookCount}`);

// v. List all available books
let availableBooks = library.filter(book => book.isavailable);
console.log(`\nAvailable Books:`);
availableBooks.forEach(book => {
   console.log(getInfo(book));
});