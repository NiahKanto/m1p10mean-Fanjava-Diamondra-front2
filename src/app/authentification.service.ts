import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from './Types/User';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private token: string | null = null;
  roles: string[] = [];
  constructor(private http: HttpClient ){}

  login(credentials: UserLogin): Observable <any> {
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
  
  updateRoles(roles: string[]){
    localStorage.setItem('roles',JSON.stringify(roles));
    this.roles=roles;
  }

  getRoles(){
    if(this.roles.length !== 0){
      return this.roles  
    }
    return JSON.parse(localStorage.getItem('roles')||'');
  }

  isManager(){
    return this.getRoles().includes('ROLE_MANAGER')
  }

  isEmploye(){
    return this.getRoles().includes('ROLE_EMPLOYE')
  }

  isClient(){
    return this.getRoles().includes('ROLE_CLIENT')
  }
}
