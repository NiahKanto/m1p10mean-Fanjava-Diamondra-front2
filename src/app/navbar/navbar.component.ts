import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthentificationService){}

  isManager(){
    return this.authService.isManager()
  }

  isEmploye(){
    return this.authService.isEmploye()
  }

  isClient(){
    return this.authService.isClient()
  }
}
