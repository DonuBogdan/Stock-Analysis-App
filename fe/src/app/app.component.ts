// https://www.positronx.io/angular-chart-js-tutorial-with-ng2-charts-examples/
import { Component, OnInit } from '@angular/core';
import { TwitterService } from './core/services/twitter.service';
import { YahooFinanceService } from './core/services/yahoo-finance.service';
import { NasdaqService } from './core/services/nasdaq.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public searchText: string = '';
 
  public dataAvailable: boolean = false;
  public showCompanyDetails: boolean = false;

  public companies: Array<any> = [];
  public tweets: Array<any> = [];
  
  public selectedCompanyDetails = '';

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any;
  lineChartColors: any;
  lineChartLegend: any;
  lineChartPlugins: any;
  lineChartType: any;

  public p: number = 1;

  constructor(private twitterService: TwitterService, private yahooFinanceService: YahooFinanceService, private nasdaqService: NasdaqService) { }

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

  getCompanies() {
    
    if (this.searchText != '') {
      this.nasdaqService.getAllCompanies(this.searchText).subscribe((res: any) => {
        this.companies = res;
      });
    } else {

      this.dataAvailable = false;
      this.showCompanyDetails = false;

      this.companies = [];
      this.tweets = [];

      this.lineChartData = [];
      this.lineChartLabels = [];

    }
  }

  getData(symbol: any) {
    
    this.dataAvailable = false;
    this.showCompanyDetails = false;

    // get tweets
    this.twitterService.getTweets(symbol).subscribe((res: any) => {

      this.tweets = res['tweets'];

    });

    // get stocks infos
    this.yahooFinanceService.getStocksInfos(symbol).subscribe((res: any) => {

      this.lineChartData = [

        { data: res['close'], label: 'Stock prices'},
      ]

      this.lineChartLabels = res['date'];

      this.selectedCompanyDetails = res['business_summary'];

      this.dataAvailable = true;

    });
    
  }

  unlockCompanyDetails() {
    this.showCompanyDetails = !this.showCompanyDetails;
  }

}