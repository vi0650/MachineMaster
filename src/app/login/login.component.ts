import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRole } from '../core/models/user';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { LoginService } from '../core/services/login.service';
import { hotToastObserve } from '../core/utils/toast-observer';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  hidePassword = false;

  constructor(private fb: FormBuilder, private loginData: LoginService, private router: Router, private toast: HotToastService) {

    const logged = localStorage.getItem("loggedUser");
    if (logged) {
      router.navigate(['/layout'], { replaceUrl: true });
    };


    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Store default users only once
    // const existing = localStorage.getItem("users");
    // if (!existing) {
    //   const defaultUsers: User[] = [
    //     {
    //       userId: 1,
    //       userName: 'admin',
    //       password: '1234',
    //       email: '',
    //       role: UserRole.Admin,
    //       isActive: true,
    //       description: '',
    //       createdDate: new Date(),
    //       updatedDate: new Date()
    //     }
    //   ];

    //   localStorage.setItem("users", JSON.stringify(defaultUsers));
    // }
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  // loginUser() {
  //   if (this.loginForm.invalid) return;
  //   const storedUsers = localStorage.getItem("users");
  //   if (!storedUsers) {
  //     return;
  //   }
  //   const users: User[] = JSON.parse(storedUsers);
  //   const loginData = this.loginForm.value;
  //   const matchedUser = users.find(
  //     (u: User) =>
  //       u.userName === loginData.userName &&
  //       u.password === loginData.password &&
  //       u.isActive === true
  //   );
  //   if (!matchedUser) {
  //     this.toast.warning("Invalid username or password!", { dismissible: true })
  //     return;
  //   }
  //   // store logged in user
  //   localStorage.setItem("loggedUser", JSON.stringify(matchedUser));
  //   // role-based routing
  //   if (matchedUser.role === UserRole.Admin) {
  //     this.toast.success('Login Successful !')
  //     this.router.navigate(['/layout']);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }

  loginUser() {
    if (this.loginForm.invalid) return;
    console.log("Form Value:", this.loginForm.value);

    this.loginData.login(this.loginForm.value).pipe(
      hotToastObserve(this.toast, {
        loading: "Logging in...",
        success: (res: any) => `Welcome ${res.userName}!`,
        error: (err) => {
          if (err.status === 0) return "Server offline!";
          if (err.status === 401) return "Invalid credentials!";
          return "Something went wrong!";
        }
      })
    ).subscribe({
        next: (res: any) => {
          console.log("Response:", res);
          if (!res) return;
          localStorage.setItem("loggedUser", JSON.stringify(res));
          this.router.navigate(['/layout']);
        },
      });
  }

}
