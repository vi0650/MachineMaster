import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  showPassword = false;
  loginForm: any;

  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Super Admin', value: 'super-admin' }
  ];

  constructor(private fb: FormBuilder) {
    
    // ✔ Initialize form here (constructor ke andar)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['admin', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  }
}
