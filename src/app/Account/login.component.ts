import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AccountService } from '../Core/Services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model = { username: '', password: '' };
  submitting = false;

  constructor(private account: AccountService, private router: Router) {}

  async onSubmit(f: NgForm) {
    if (f.invalid) return;
    this.submitting = true;
    try {
      // Map username to email for the mock login
      await this.account.login(this.model.username, this.model.password);
      this.router.navigateByUrl('/home');
    } finally {
      this.submitting = false;
    }
  }
}
