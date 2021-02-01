// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public searchText: string = '';
  public programmingLanguages = ['Python','TypeScript','C','C++','Java', 'Go','JavaScript','PHP','Ruby','Swift','Kotlin']
  public books: Array<any> = [];
  public tweets: Array<any> = ['Ce mai faciiiiiiiiiiiii?', 'Ce faci?', 'Sunt bine, tu ce faci?', 'Uite bine, tu?', 'Nu stiu !', 'Samsung', 'Apple', 'Apple 2'];
  public filteredTweets: Array<any> = [];
  public tweetsAvailable: boolean = false;


  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';
  




  constructor(private http: HttpClient) { }

  getAllBooks() {
    return this.http.get<[]>('http://127.0.0.1:5000/api/v1/resources/books/all').subscribe((books) => this.books = books)
  }

  getTweets(searchText: string) {
    // console.log(searchText)
    if (searchText == '') {
      console.log('Nothing to display.')
      this.tweetsAvailable = false;
    }
    else {
      // get tweets
      this.filteredTweets = this.tweets.filter(tweet => tweet.toLocaleLowerCase() == searchText.toLocaleLowerCase())
      this.tweetsAvailable = true;      
    }
  }

}