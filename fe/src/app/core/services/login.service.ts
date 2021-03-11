import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoginService implements OnInit {

    user: any = false;

    constructor(private http: HttpClient) { }

    ngOnInit() { }

    userLoggedIn() {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    login(username: String, password: String) {

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/login', {username, password}).pipe(res => {
            this.user = true;
            return res;
        });
        
    }

}