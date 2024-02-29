import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  template: `
  <button mat-icon-button (click)="toggleDiv()" class="menu">
  <mat-icon >menu</mat-icon>
</button>
  `
})
export class HeaderComponent {
  constructor(private authService: AuthentificationService, private router: Router,private sharedService: SharedService){}

  logout():void{
    this.authService.logout();
    this.router.navigate(['/']);
  }
  toggleDiv() {
    this.sharedService.toggleDivVisibility();
  }
  isClient(){
    return this.authService.isClient()
  }
}
