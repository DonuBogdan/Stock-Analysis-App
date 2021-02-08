// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StocksJson } from './shared/models/stocks';
import { TweetsJson } from './shared/models/tweets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public searchText: string = '';
  public tweets: Array<any> = [];
  public dataAvailable: boolean = false;
  public showCompanyDetails: boolean = false;

  public companyInfos: Array<any> = [];
  public selectedSymbol = '';
  public selectedCompanyName = '';
  public selectedCompanySummary = '';

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any;
  lineChartColors: any;
  lineChartLegend: any;
  lineChartPlugins: any;
  lineChartType: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.lineChartData = [];

    this.lineChartLabels = [];
  
    this.lineChartOptions = {
      responsive: true,
    };
  
    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(0, 100, 0, 0.25)',
      },
    ];
  
    this.lineChartLegend = true;
    this.lineChartPlugins = [];
    this.lineChartType = 'line';

  }

  getSymbols() {
    if (this.searchText != '') {
      this.http.get('http://127.0.0.1:5000/api/v1/resources/symbols', {params: {searchText: this.searchText}}).subscribe((res: any) => {
        this.companyInfos = res;

        // console.log(this.companyInfos)
      })
    } else {

      this.dataAvailable = false;
      this.showCompanyDetails = false;

      this.companyInfos = [];

      this.tweets = [];

      this.lineChartData = [];
      this.lineChartLabels = [];

    }
  }

  getData(symbol: any, name: any) {

    this.selectedSymbol = symbol;
    this.selectedCompanyName = name;
    
    this.dataAvailable = false;
    this.showCompanyDetails = false;

    // get tweets
    this.http.get('http://127.0.0.1:5000/api/v1/resources/tweets', {params: {companyName: symbol}}).subscribe((res: TweetsJson) => {
    
      this.tweets = res['tweets'];
    });

    this.http.get('http://127.0.0.1:5000/api/v1/resources/stocks', {params: {companyName: symbol}}).subscribe((res: StocksJson) => {

      this.lineChartData = [

        { data: res['close'], label: 'Stock prices'},
      ]

      this.lineChartLabels = res['date'];

      this.selectedCompanySummary = res['business_summary'];

      this.dataAvailable = true;

    });
    
  }

  unlockCompanyDetails() {
    this.showCompanyDetails = !this.showCompanyDetails;
  }

}