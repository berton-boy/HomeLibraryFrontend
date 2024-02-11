
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from './book';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseURL = "https://localhost:443/api/v1/books";
  constructor(private httpClient: HttpClient) { }

getBooksList(): Observable<Book[]>{
  return this.httpClient.get<Book[]>(`${this.baseURL}`);
}

createBook(book: Book): Observable<Object> {
  return this.httpClient.post(`${this.baseURL}`, book);
}

findBookByISBN(isbn: String): Observable<Book> {
  return this.httpClient.get<Book>(`${this.baseURL + "/findBookInOLApiByIsbn"}/${isbn}`);
}

getBookById(id: number): Observable<Book> {
  return this.httpClient.get<Book>(`${this.baseURL}/${id}`);

}

updateBook(id: number, book: Book): Observable<Object> {
  return this.httpClient.put(`${this.baseURL}/${id}`, book);
}

deleteBook(id: number): Observable<Object> {
  return this.httpClient.delete(`${this.baseURL}/${id}`);
}

saveCoverImage(id: number, formData: FormData) : Observable<Object> {
  return this.httpClient.post(`${this.baseURL}/${id}/save-image`, formData, { responseType: 'blob' });
}

addEvent(bookId: number, formData: FormData) : Observable<Object> {
  return this.httpClient.post(`${this.baseURL}/${bookId}/addEvent`, formData);
}


}
