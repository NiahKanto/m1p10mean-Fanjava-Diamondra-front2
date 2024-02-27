import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';
import { Observable } from 'rxjs';
import { Users } from '../Types/User';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  constructor(
    private http: HttpClient, 
    private authService: AuthentificationService,
  ){}

  users: Users = [];

  fetchClient() : Observable<Users> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return  this.http.get<Users>('https://m1p10mean-fanjava-diamondra-back.vercel.app/liste_user/client',{headers: headers});
  }

  ngOnInit(): void {
    this.fetchClient().subscribe((data: Users) => {
      this.users = data;
    })
  }

}
