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
  userdata: User[] = [];
  role = Object.values(UserRole);

  constructor(private fb: FormBuilder, private loginData: LoginService, private router: Router, private toast: HotToastService) {

    const logged = localStorage.getItem("loggedUser");
    if (logged) {
      router.navigate(['/layout'], { replaceUrl: true });
    };

    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
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
    const user: User = this.loginForm.value as User;
    if (!user.userName?.trim()) {
      this.toast.error(`please enter <b><u>UserName</u></b>`);
      return;
    } else if (!user.password?.trim()) {
      this.toast.error('please enter your <b><u>password</u></b>');
      return;
    };
    console.log("Form Value:", user);
    this.loginData.login(user).pipe(
      hotToastObserve(this.toast, {
        loading: "Logging in...",
        success: "",
        error: (err) => {
          if (err.status === 0) return "Server offline!";
          if (err.status === 401) return "Invalid credentials!";
          return "Something went wrong!";
        },
      })
    ).subscribe({
      next: (res: any) => {
        if (!res) return;
        if (!res.isActive) {
          this.toast.info(`<b>${res.userName}</b> is not active!`);
          return;
        }
        console.log("Response: ", res);
        if (res.role !== UserRole.Admin && !user.isActive) {
          this.toast.info('you are not an Admin')
        }
        if (res.role === UserRole.Admin || user.isActive) {
          this.toast.success(`Welcome ${res.userName}!`);
          localStorage.setItem("loggedUser", JSON.stringify(res));
          this.router.navigate(['/layout']);
        }
        return this.router.parseUrl('login')
      },
    });
  }

}
