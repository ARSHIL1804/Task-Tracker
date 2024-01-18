
import { Router, UrlTree } from "@angular/router";
import { AuthService } from "../auth.service";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return false;
    }
    this.authService.fetchUserDetails();
    return true;
  }
}