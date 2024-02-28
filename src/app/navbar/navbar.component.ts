import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  template: `
  <div *ngIf="divVisible$ | async">
    <!-- Your content goes here -->
  </div>
  `
})
export class NavbarComponent {
  constructor(private authService: AuthentificationService,private sharedService: SharedService){}

  divVisible$ = this.sharedService.divVisibility$;

  isManager(){
    return this.authService.isManager()
  }

  isEmploye(){
    return this.authService.isEmploye()
  }

  isClient(){
    return this.authService.isClient()
  }
  toggleDiv() {
    this.sharedService.toggleDivVisibility();
  }
}

