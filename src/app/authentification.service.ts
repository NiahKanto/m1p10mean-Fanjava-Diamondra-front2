import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private token: string | null = null;
  constructor(private http: HttpClient ){}

  login(credentials: any): Observable <any> {
    return this.http.post('http://localhost:3000/login_user',credentials);
  }

  setToken(token: string):void{
    this.token = token
    localStorage.setItem('jwtToken',token);
  }

  getToken() : string | null{
    return this.token || localStorage.getItem('jwtToken')
  }

  logout(): void {
    this.token = null
    localStorage.removeItem('jwtToken')
  }

  getHeaders () : HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken}`
    });
  }
  
}
