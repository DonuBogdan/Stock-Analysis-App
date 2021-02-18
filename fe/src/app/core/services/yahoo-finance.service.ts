import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class YahooFinanceService {

    constructor(private http: HttpClient) { }

    getStocksInfos(symbol: any): Observable<any> {

        // get stocks infos
        return this.http.get('http://127.0.0.1:5000/api/v1/resources/stocks', {params: {companyName: symbol}}).pipe(
            map((res: any) => {
                
                let result: any = [];

                let dates = res['date'];
                let prices = res['close'];

                dates.forEach((date: any, index: any) => {

                    const obj = {
                        'name': date,
                        'value': prices[index]
                    };

                    result.push(obj);

                });
                
                return [result, res['business_summary'], res['currency']]
            })
        );
        
    }

}