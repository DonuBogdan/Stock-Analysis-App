import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public searchText: string = '';
  public programmingLanguages = ['Python','TypeScript','C','C++','Java', 'Go','JavaScript','PHP','Ruby','Swift','Kotlin']
  public books: Array<any> = [];

  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get<[]>('http://127.0.0.1:5000/api/v1/resources/books/all').subscribe((books) => this.books = books)
  }

}
