import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoCompanyGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(
        switchMap(async (user: firebase.User | null, index: number) => {
          if (user) {
            return await user.getIdTokenResult(false).then((tokenResult) => {
              if (tokenResult.claims.company) {
                return true;
              } else {
                this.router.navigate(['/cadastro/empresa']);
                return false
              }
            }).catch((err) => {
              this.router.navigate(['/cadastro/empresa']);
              return false;
            });
          } else {
            this.router.navigate(['/auth/entrar']);
            return false;
          }
        }),
        
      )
  }
  
}
