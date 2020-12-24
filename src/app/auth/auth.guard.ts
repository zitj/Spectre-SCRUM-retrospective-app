import { Injectable } from '@angular/core';
import { CanLoad, UrlTree, Router, UrlSegment, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem('UserLoggedIn')) {
      this.router.navigate(['/main']);
      return false;
    }
    return true;
  }
}
