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

  constructor(private http: HttpClient) { }

  // helloWorld() {
  //   return this.http.get<[]>('http://127.0.0.1:5000/').subscribe((res) => this.response = res)
  // }

}
