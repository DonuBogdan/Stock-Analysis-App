import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../../core/services/account.service';

@Injectable({ 
    providedIn: 'root' 
})
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(): Observable<boolean> {

        return new Observable<boolean>(obs => {

            const token = localStorage.getItem('token'); 

            this.accountService.ensureAuthenticated(token).subscribe((res: any) => {

                if (res['status'] == 'success') {
                    console.log('true');
                    obs.next(true);
                } else {

                    console.log('false');

                    this.router.navigate(['/login']);

                    obs.next(false);
                }
    
            });

        });

    }

}