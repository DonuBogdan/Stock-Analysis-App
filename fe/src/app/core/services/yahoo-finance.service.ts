import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class YahooFinanceService {

    constructor(private http: HttpClient) { }

    getStocksInfos(symbol: any): Observable<any> {

        // get stocks infos
        return this.http.get('http://127.0.0.1:5000/api/v1/resources/stocks', {params: {companyName: symbol}});
        
    }

}