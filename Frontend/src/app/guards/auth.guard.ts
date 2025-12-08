import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { LoginService } from '../core/services/login.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router,private loginService: LoginService) { }

  canActivate(): Observable<boolean | UrlTree> {
    const logged = localStorage.getItem('loggedUser');

    // If NO logged user → redirect to login
    if (!logged) {
      return of(this.router.parseUrl('/login'));
    }

    const user =JSON.parse(logged)
    // If logged → allow route
    return this.loginService.getUserById(user.userId).pipe(
      map((res: any) => {
        if (!res) {
          localStorage.removeItem('loggedUser');
          return this.router.parseUrl('login');
        }

        if(res.isActive && res.userId === user.userId){
          return true;
        }

        localStorage.removeItem('loggedUser');
        return this.router.parseUrl('login');
      }),
      catchError(() => {
        localStorage.removeItem("loggedUser");
        return of(this.router.parseUrl('login'));
      })
    );
  }
}