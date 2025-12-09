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

  private buildForm(): FormGroup {
    return this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  constructor(private fb: FormBuilder, private loginData: LoginService, private router: Router, private toast: HotToastService) {
    const logged = localStorage.getItem("loggedUser");
    if (logged) {
      router.navigate(['/layout'], { replaceUrl: true });
    };

    this.loginForm = this.buildForm();
  }

  showHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  loginUser() {
    const user: User = this.loginForm.value as User;
    console.log("Form Value:", user);
    this.loginData.login(user).pipe(
      hotToastObserve(this.toast, {
        loading: "Please Wait...",
        success: "",
        error: (err) => {
          if (err.status === 0) return "Server is Offline!";
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
        if (res.role !== UserRole && !res.isActive) {
          this.toast.info('you are not an Admin')
        }
        if (res.role === UserRole || res.isActive) {
          this.toast.success(`Welcome ${res.userName}!`);
          localStorage.setItem("loggedUser", JSON.stringify(res));
          this.router.navigate(['/layout']);
        }
        return this.router.parseUrl('login')
      },
    });
  }

}
