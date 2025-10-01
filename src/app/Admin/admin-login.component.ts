import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../Core/Services/account.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  model = { email: '', password: '' };
  submitting = false;

  constructor(private account: AccountService, private router: Router) {}

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.submitting = true;
    try {
      await this.account.login(this.model.email, this.model.password);
      this.router.navigate(['/admin']);
    } catch (e) {
      // noop for mock
    } finally {
      this.submitting = false;
    }
  }
}
