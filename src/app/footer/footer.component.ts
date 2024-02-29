import { Component } from '@angular/core';

import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private authService: AuthentificationService ){}
  isClient(){
    return this.authService.isClient()
  }
}
