// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
import { Component, OnInit,  OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ThrowStmt } from '@angular/compiler';
import { StocksJson } from './core/models/stocks';
import { TweetsJson } from './core/models/tweets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public searchText: string = '';
  public programmingLanguages = ['Python','TypeScript','C','C++','Java', 'Go','JavaScript','PHP','Ruby','Swift','Kotlin']
  public tweets: Array<any> = [];
  public filteredTweets: Array<any> = [];
  public tweetsAvailable: boolean = false;

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any;
  lineChartColors: any;
  lineChartLegend: any;
  lineChartPlugins: any;
  lineChartType: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.lineChartData = [
      { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
    ];
  
    this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June'];
  
    this.lineChartOptions = {
      responsive: true,
    };
  
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      },
    ];
  
    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';

  }

  // ngOnChanges() {
  //   console.log('ABC')
  //   console.log(this.stocks)
  // }

  getStocksInfos(searchText: string) {
    console.log(searchText)
    return this.http.get('http://127.0.0.1:5000/api/v1/resources/stocks', {params: {companyName: searchText}}).subscribe((res: StocksJson) => {
      console.log(res['close'])
      console.log(res['date'])
      console.log(res['currency'])
      console.log(res['full_name'])

      this.lineChartData = [
        { data: res['close'], label: 'Stock prices'},
      ]
      this.lineChartLabels = res['date']
    })
  }

  getTweets(searchText: string) {
    // console.log(searchText)

    // get tweets
    return this.http.get('http://127.0.0.1:5000/api/v1/resources/tweets', {params: {companyName: searchText}}).subscribe((res: TweetsJson) => {

      console.log(res['tweets']);

      // this.tweets = res;
      this.tweetsAvailable = true;    
    })
 
    }

}