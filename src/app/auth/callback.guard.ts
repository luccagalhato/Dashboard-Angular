import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallbackGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const params = route.queryParamMap
      const mode = params.get('mode')
      if (mode === 'verifyEmail') {
        this.router.navigate(['/auth/confirmarEmail'], {queryParams: route.queryParams})
        return false;
      } else if (mode === 'resetPassword') {
        this.router.navigate(['/auth/recuperarSenha'], {queryParams: route.queryParams})
        return false;
      } else {
        this.router.navigate(['/'])
        return false;
      }
  }
}
