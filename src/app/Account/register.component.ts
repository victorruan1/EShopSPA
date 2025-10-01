import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../Core/Services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    phone: FormControl<string>;
    dateOfBirth: FormControl<string>;
  }>;
  submitting = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private account: AccountService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      lastName: this.fb.control('', [Validators.required, Validators.maxLength(50)]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      phone: this.fb.control('', [Validators.required, Validators.pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)]),
      dateOfBirth: this.fb.control('', [Validators.required]),
    });
  }

  get f() { return this.form.controls; }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    try {
  const { firstName, lastName, email } = this.form.getRawValue();
      await this.account.register({
        name: `${firstName} ${lastName}`.trim(),
        email,
      });
      this.router.navigateByUrl('/');
    } finally {
      this.submitting = false;
    }
  }
}
