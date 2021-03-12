import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../core/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    console.log('Logout.')
    this.accountService.logout();
  }

}
