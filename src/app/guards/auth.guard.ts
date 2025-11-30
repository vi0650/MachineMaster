import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree {
    const logged = localStorage.getItem('loggedUser');

    // If NO logged user → redirect to login
    if (!logged) {
      return this.router.parseUrl('/login');
    }
    // If logged → allow route
    return true;
  }
}