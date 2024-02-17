import { Component } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'm1p1mean-Fanjava-Diamondra-front';
  constructor(private http: HttpClient, private authService: AuthentificationService){}

  isLoggedIn(): boolean{
    return !!this.authService.getToken();
  }

  fetchData() : void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    this.http.get<any>('http://localhost:3000/clients',{headers: headers}).subscribe(response =>{
      console.log(response)
    }, error => {
      console.error(error)
    })
  }

}
