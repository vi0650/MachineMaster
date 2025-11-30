import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = false;

  constructor(private fb: FormBuilder, private router: Router) {

    const logged = localStorage.getItem("loggedUser");
    if(logged){
      router.navigate(['/layout'], {replaceUrl: true});
    };

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Store default users only once
    const existing = localStorage.getItem("users");
    if (!existing) {
      const defaultUsers: User[] = [
        {
          userId: 1,
          userName: 'admin',
          password: '1234',
          email: '',
          role: UserRole.Admin,
          isActive: true,
          description: '',
          createdDate: new Date(),
          updatedDate: new Date()
        }
      ];

      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  loginUser() {
    if (!this.loginForm.valid) return;

    const storedUsers = localStorage.getItem("users");
    if (!storedUsers) {
      
      return;
    }

    const users: User[] = JSON.parse(storedUsers);
    const loginData = this.loginForm.value;

    const matchedUser = users.find(
      (u: User) =>
        u.userName === loginData.userName &&
        u.password === loginData.password &&
        u.isActive === true
    );

    if (!matchedUser) {
      alert("Invalid username or password!");
      return;
    }

    // store logged in user
    localStorage.setItem("loggedUser", JSON.stringify(matchedUser));

    // role-based routing
    if (matchedUser.role === UserRole.Admin) {
      this.router.navigate(['/layout']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
