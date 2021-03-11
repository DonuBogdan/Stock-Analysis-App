import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../../core/services/login.service';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private loginService: LoginService
    ) {}

    canActivate() {

        console.log(this.loginService.userLoggedIn())

        if (this.loginService.userLoggedIn()) {
            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);

        return false;
    }
}