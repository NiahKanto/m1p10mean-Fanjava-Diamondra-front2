import { Component } from '@angular/core';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private authService: AuthentificationService){}
  roles = this.authService.getRoles();
  ngOnInit(){
    console.log(this.roles)
  }
}
