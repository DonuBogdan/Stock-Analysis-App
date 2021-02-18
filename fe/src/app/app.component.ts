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

  view: [number, number] = [700, 500];
  data: any[] = [];
  
  // options
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = '';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#006400', '#2199e8']
  };
  
  public searchText: string = '';
 
  public dataAvailable: boolean = false;
  public showCompanyDetails: boolean = false;

  public companies: Array<any> = [];
  public tweets: Array<any> = [];
  
  public selectedCompanyDetails = '';

  public p: number = 1;

  constructor(private twitterService: TwitterService, private yahooFinanceService: YahooFinanceService, private nasdaqService: NasdaqService) { 
  }

  ngOnInit() {
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

      this.data = [
        {
          'name': 'Real data',
          'series': res[0].slice(0, res[0].length - 1)
        },
        {
            'name': 'Predicted data',
            'series': res[0].slice(res[0].length - 2, res[0].length)
        }
      ];

      this.yAxisLabel = 'Price' + ' (' + res[2] + ')';

      this.selectedCompanyDetails = res[1];

      this.dataAvailable = true;

    });
    
  }

  unlockCompanyDetails() {
    this.showCompanyDetails = !this.showCompanyDetails;
  }

}