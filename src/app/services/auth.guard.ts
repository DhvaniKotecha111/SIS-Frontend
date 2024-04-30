import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate{

  constructor(private loginservice: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginservice.isLoggedIn()) {
      return true;
    } 
    else {
      // Redirect to login page if user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}