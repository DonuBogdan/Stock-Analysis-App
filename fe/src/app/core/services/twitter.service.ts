import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class TwitterService {

    constructor(private http: HttpClient) { }

    getTweets(symbol: any): Observable<any> {

        // get tweets
        return this.http.get('http://127.0.0.1:5000/api/v1/resources/tweets', {params: {companyName: symbol}});
        
    }

}