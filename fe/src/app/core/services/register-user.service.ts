import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';

@Injectable({
    providedIn: 'root',
})
export class RegisterUserService {

    constructor(private http: HttpClient) { }

    registerUser(user: User) {

        console.log(user);

        return this.http.post('http://127.0.0.1:5000/api/v1/resources/register', user);
        
    }

}