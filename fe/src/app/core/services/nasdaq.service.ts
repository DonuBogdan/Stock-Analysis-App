import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class NasdaqService {

    constructor(private http: HttpClient) { }

    getAllCompanies(searchText: any): Observable<any> {

        return this.http.get('http://127.0.0.1:5000/api/v1/resources/symbols', {params: {searchText: searchText}});
        
    }

}