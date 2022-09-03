import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(`${this.API_URI}/books`);
  }

  getBook(id: string) {
    return this.http.get(`${this.API_URI}/books/${id}`);
  }

  deleteBook(id: string) {
    return this.http.delete(`${this.API_URI}/books/${id}`);
  }

  saveBook(book: Book) {
    return this.http.post(`${this.API_URI}/books`, book);
  }

  updateBook(id: string|number, updatedBook: Book): Observable<Book> {
    return this.http.put(`${this.API_URI}/books/${id}`, updatedBook);
  }
}
