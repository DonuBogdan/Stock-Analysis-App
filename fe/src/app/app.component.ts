// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public searchText: string = '';
  public programmingLanguages = ['Python','TypeScript','C','C++','Java', 'Go','JavaScript','PHP','Ruby','Swift','Kotlin']
  public tweets: Array<any> = ['Ce mai faciiiiiiiiiiiii?', 'Ce faci?', 'Sunt bine, tu ce faci?', 'Uite bine, tu?', 'Nu stiu !', 'Samsung', 'Apple', 'Apple 2'];
  public filteredTweets: Array<any> = [];
  public tweetsAvailable: boolean = false;


  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';


  constructor(private http: HttpClient) { }



  getStocksInfos() {
    console.log('Merge');
    return this.http.get('http://127.0.0.1:5000/api/v1/resources/stocks', {params: {companyName: 'AAPL'}}).subscribe((stocks) => console.log(stocks))
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