import api from "./axios";

export const getBooks = () =>
  api.get("/books", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


export const addBook = (book) =>
  api.post("/books", book, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateBook = (id, updatedBook) =>
  api.put(`/books/${id}`, updatedBook, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteBook = (id) =>
  api.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


  export const borrowBook = (bookId) =>
  api.post(`/borrow/${bookId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const returnBook = (bookId) =>
  api.post(`/return/${bookId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getBorrowedBooks = () =>
  api.get(`/borrowed`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
