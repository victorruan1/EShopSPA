import { Component } from '@angular/core';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private account: AccountService, private router: Router) {}
  currentUser$ = this.account.currentUser$;
  signOut() {
    this.account.logout();
    this.router.navigateByUrl('/account/login');
  }
}
