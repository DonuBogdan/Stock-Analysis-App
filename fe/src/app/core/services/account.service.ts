import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AccountService implements OnInit {

    user: any = false;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) { }

    ngOnInit() { }

    userLoggedIn() {
        if (this.user) {
            return true;
        } else {
            return false;
        }
    }

    registerUser(user: User) {

        console.log(user);

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/register', user);
        
    }

    login(username: String, password: String) {

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/login', {username, password}).pipe(res => {
            this.user = true;
            return res;
        });
        
    }

    logout() {
        // this.user = false;
        this.router.navigate(['/login']);
    }

}