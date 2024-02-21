import { Component } from '@angular/core';
import { AuthentificationService } from './authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm1p1mean-Fanjava-Diamondra-front';
  constructor(private authService: AuthentificationService){}

  isLoggedIn(): boolean{
    return !this.authService.getToken();
  }

}
