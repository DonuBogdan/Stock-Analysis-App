import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(private http: HttpClient) { }

    login(username: String, password: String) {

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/login', {username, password});
        
    }

}