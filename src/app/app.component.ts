import { Component } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm1p1mean-Fanjava-Diamondra-front';

  currentUrl: string = '';

  constructor(private authService: AuthentificationService, private router: Router){
    this.router.events
    .pipe(filter((event) : event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) =>{
      this.currentUrl = event.url;
      console.log(this.currentUrl)
    });
  }

  isLoggedIn(): boolean{
    return !!this.authService.getToken();
  }

  isInscription(): boolean{
    if(this.currentUrl === '/inscription'){
      this.authService.logout();
      return true;
    }
    return false;
  }

}
