import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../../core/services/account.service';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate() {

        console.log(this.accountService.userLoggedIn())

        if (this.accountService.userLoggedIn()) {
            // authorized so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);

        return false;
    }
}