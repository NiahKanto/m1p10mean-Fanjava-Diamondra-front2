import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin, UserInscription } from './Types/User';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private token: string | null = null;
  roles: string[] = [];
  constructor(private http: HttpClient ){}

  private getTokenExpirationDate(token : string ): Date | null {
    try{
      const jwtPayload = JSON.parse(atob(token.split('.')[1]));
      if(jwtPayload && jwtPayload.exp){
        return new Date(jwtPayload.exp*1000);
      }
    }catch (e){

    }
    return null;
  }

  isTokenExpired(token: string): boolean{
    const expirationDate = this.getTokenExpirationDate(token);
    if(!expirationDate){
      return false;
    }
    return expirationDate < new Date();
  }

  login(credentials: UserLogin): Observable <any> {
    return this.http.post('https://m1p10mean-fanjava-diamondra-back.vercel.app/login_user',credentials);
  }

  setToken(token: string ):void{
    this.token = token
    localStorage.setItem('jwtToken',token);
  }

  getToken() : string | null{
    const t = this.token || localStorage.getItem('jwtToken')
    if(t !== null ){
        if(this.isTokenExpired(t)){
          return null;
        }
    }
    return t;
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

  inscription(credentials: UserInscription): Observable <any> {
    return this.http.post('https://m1p10mean-fanjava-diamondra-back.vercel.app/inscription_user',credentials);
  }
}
