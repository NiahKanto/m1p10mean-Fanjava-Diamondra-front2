import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthentificationService } from './authentification.service'

@Injectable({
    providedIn: 'root'
})

export class AuthGuardManager implements CanActivate{
    constructor(private router: Router, private authService: AuthentificationService){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean> {
        if(this.authService.isManager()){
            return true;
        }
        else{
            return this.router.parseUrl('/home')
        }
    }
}

export class AuthGuardClient implements CanActivate{
    constructor(private router: Router, private authService: AuthentificationService){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean> {
        if(this.authService.isClient()){
            return true;
        }
        else{
            return this.router.parseUrl('/home')
        }
    }
}

export class AuthGuardEmploye implements CanActivate{
    constructor(private router: Router, private authService: AuthentificationService){}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean> {
        if(this.authService.isEmploye()){
            return true;
        }
        else{
            return this.router.parseUrl('/home')
        }
    }
}