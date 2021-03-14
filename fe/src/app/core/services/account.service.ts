import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

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

    // userLoggedIn() {
    //     if (this.user) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    registerUser(user: User) {
    
        console.log(user);

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/register', user);
        
    }

    login(username: String, password: String) {

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/login', {username, password})
        .pipe(map(
            (res: any) => {
                localStorage.setItem('token', res.auth_token);
                this.user = true;
                return res;
        }));
        
    }
    
    ensureAuthenticated(token: any) {
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });

        return this.http.get('http://127.0.0.1:5000/api/v1/resources/status', {headers: headers});
    
    }

    logout() {
        // this.user = false;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

}