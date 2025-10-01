import { Component } from '@angular/core';
import { AccountService } from '../../Core/Services/account.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private account: AccountService) {}
  currentUser$ = this.account.currentUser$;
  currentYear = new Date().getFullYear();
}
